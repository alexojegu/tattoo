import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

export default {
    Date: new GraphQLScalarType<Date, string>({
        name: "Date",
        serialize(value) {
            if (!(value instanceof Date)) {
                throw new GraphQLError("Date scalar cannot represent an invalid date instance");
            }

            return value.toISOString();
        },
        parseValue(value) {
            if (typeof value !== "string") {
                throw new GraphQLError("Date scalar cannot represent a type other than a string");
            }

            return new Date(value);
        },
        parseLiteral(ast) {
            if (ast.kind !== Kind.STRING) {
                throw new GraphQLError("Date scalar cannot represent a kind other than a string");
            }

            return new Date(ast.value);
        },
    }),
};
