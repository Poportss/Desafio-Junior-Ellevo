import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import Cleave from 'cleave.js';

@Directive({
  selector: '[appMask]',
})
export class MaskDirective {
  @Input('appMask')
  public appMask:
    | 'money'
    | 'cpf'
    | 'cnpj'
    | 'full-phone'
    | 'phone'
    | 'integer'
    | 'decimal'
    | 'hour'
    | 'cardNumber'
    | 'cardExpirationDate'
    | 'zipCode'
    | 'custom'
    | 'none'; //Ex custom: (00) 00000-0000;

  @Input('appMaskCustom')
  public custom: string;

  @Input('appMaskNumberMaxLength')
  public maxLength: number;
  @Input('appMaskNumberMinValue')
  public minValue: number;
  @Input('appMaskNumberMaxValue')
  public maxValue: number;
  @Input('appMaskNumberDecimalScale')
  public decimalScale = 2;

  private cleave: Cleave;
  private firstValueCorrection = true;

  constructor(
    private hostElRef: ElementRef<HTMLInputElement>,
    @Optional() @Self() private control: NgControl,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buildCleave();
  }

  private buildCleave(options: Object = {}): void {
    const hostEl = this.hostElRef.nativeElement;
    const cleaveOptions = this.getCleaveOptions(hostEl.value);
    this.cleave = new Cleave(hostEl, {
      ...cleaveOptions,
      ...options,
      onValueChanged: (e) => {
        const rawValue = e.target.rawValue as string;
        const value = e.target.value as string;
        const control = this.control && this.control.control;
        if (control && control.value !== value) {
          const eventOpts = {} as any;
          // em casos onde é a criacao do formControl que está vindo com um valor incorreto
          // corrige o valor sem enviar valueChanges
          if (this.firstValueCorrection) {
            this.firstValueCorrection = false;
            eventOpts.emitEvent = false;
          }

          if (this.appMask !== 'full-phone') {
            this.control.control.setValue(value, eventOpts);
            this.changeDetectorRef.markForCheck();
          }
        }

        if (this.appMask === 'full-phone') {
          this.processFullPhoneMask(value, control);
        }

        if (this.appMask === 'integer' || this.appMask === 'decimal') {
          if (this.maxValue && this.maxValue > 0) {
            if (parseFloat(rawValue) > this.maxValue) {
              this.setInputAndControlValue(this.maxValue);
            }
          }
          if (this.minValue) {
            if (parseFloat(rawValue) < this.minValue) {
              this.setInputAndControlValue(this.minValue);
            }
          }
        }
      },
    });
  }

  private processFullPhoneMask(
    value: string,
    control: AbstractControl,
    eventOpts: any = {}
  ): void {
    if (!this.cleave) {
      this.control.control.setValue(value, { emitEvent: false });
      this.changeDetectorRef.markForCheck();
      return;
    }
    const newValueNumbers = control.value.replace(/[^0-9]/gi, '');
    const penultimateBlock =
      this.cleave.properties.blocks[this.cleave.properties.blocksLength - 2];

    if (
      (newValueNumbers.length >= 13 && penultimateBlock === 4) ||
      (newValueNumbers.length <= 12 && penultimateBlock === 5)
    ) {
      this.cleave.destroy();
      this.cleave = undefined;
      this.control.control.setValue(newValueNumbers, eventOpts);
      this.changeDetectorRef.markForCheck();
      this.buildCleave({
        blocks: [0, 2, 0, 2, 0, penultimateBlock === 5 ? 4 : 5, 4],
      });
    } else {
      this.control.control.setValue(value, eventOpts);
      this.changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.destroyCleaveJs();
  }

  private setInputAndControlValue(val: any, emitEvent = true): void {
    this.control.control.setValue(val, { emitEvent });
    this.hostElRef.nativeElement.value = `${val}`;
  }

  private destroyCleaveJs(): void {
    if (this.cleave) {
      this.cleave.destroy();
    }
  }
  private getCleaveOptions(currentValue: string): Object {
    switch (this.appMask) {
      case 'money':
        let prefix = 'R$';
        let decimalMark = ',';
        let delimiter = '.';
        return {
          numeral: true,
          numeralDecimalMark: decimalMark,
          delimiter: delimiter,
          numeralDecimalScale: 2,
          prefix: prefix,
        };
      case 'cpf':
        return {
          delimiters: ['.', '.', '-'],
          blocks: [3, 3, 3, 2],
          numericOnly: true,
        };
      case 'cnpj':
        return {
          delimiters: ['.', '.', '/', '-'],
          blocks: [2, 3, 3, 4, 2],
          numericOnly: true,
        };
      case 'full-phone': {
        if (
          currentValue &&
          ((!isNaN(Number(currentValue)) && currentValue.length === 13) ||
            currentValue.length === 19)
        ) {
          return {
            delimiters: ['+', ' ', '(', ')', ' ', '-'],
            blocks: [0, 2, 0, 2, 0, 5, 4],
            numericOnly: true,
          };
        }

        return {
          delimiters: ['+', ' ', '(', ')', ' ', '-'],
          blocks: [0, 2, 0, 2, 0, 4, 4],
          numericOnly: true,
        };
      }
      case 'phone':
        let delimiters = ['(', ')', ' ', '-'];
        let blocks = [0, 2, 0, 5, 4];
        return {
          delimiters: delimiters,
          blocks: blocks,
          numericOnly: true,
        };
      case 'decimal':
        return {
          numeral: true,
          numeralPositiveOnly: true,
          numeralThousandsGroupStyle: 'none',
          stripLeadingZeroes: false,
          numeralDecimalScale: this.decimalScale,
          numeralIntegerScale: this.maxLength,
        };
      case 'integer':
        return {
          numeral: true,
          numeralPositiveOnly: true,
          numeralThousandsGroupStyle: 'none',
          stripLeadingZeroes: false,
          numeralDecimalScale: 0,
          numeralIntegerScale: this.maxLength,
        };
      case 'hour':
        return {
          time: true,
          timePattern: ['h', 'm'],
        };
      case 'cardNumber':
        return {
          delimiters: [' ', ' ', ' '],
          blocks: [4, 4, 4, 4],
          numericOnly: true,
        };
      case 'cardExpirationDate':
        return {
          date: true,
          datePattern: ['m', 'y'],
        };
      case 'zipCode':
        return {
          delimiters: ['-'],
          blocks: [5, 3],
          numericOnly: true,
        };
      case 'custom':
        return this.parseRegex();
      case 'none':
        break;
      default:
        throw new Error('Type not found');
    }
  }

  private parseRegex(): Object {
    let iCountItens = 0;
    const delimiters = [];
    const blocks = [];
    for (let i = 0; i < this.custom.length; i++) {
      const char = this.custom.charAt(i);
      switch (char) {
        case '0':
          iCountItens++;
          break;
        default:
          delimiters.push(char);
          blocks.push(iCountItens);
          iCountItens = 0;
          break;
      }
    }
    blocks.push(iCountItens);

    return {
      delimiters: delimiters,
      blocks: blocks,
      numericOnly: true,
    };
  }
}
