import { StatusPipe } from './status.pipe';

describe('Pipe: Statuse', () => {
  it('create an instance', () => {
    let pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });
});
