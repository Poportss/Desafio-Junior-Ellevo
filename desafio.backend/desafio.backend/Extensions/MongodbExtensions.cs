using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Linq;
using System.Reflection;

namespace desafio.backend.Extensions
{
    public static class MongodbExtensions
    {
        public static string GetCollectionName(this Type type)
        {
            var bsonDiscriminatorAttribute = type.GetTypeInfo().GetCustomAttributes<BsonDiscriminatorAttribute>().FirstOrDefault();
            var collectionName = bsonDiscriminatorAttribute != null ? bsonDiscriminatorAttribute.Discriminator : type.Name.Replace("Entity", "");
            return collectionName;
        }
    }
}
