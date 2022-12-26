import { GraphQLScalarType, Kind } from "graphql";

export default {
    Date: new GraphQLScalarType<Date, string>({
        name: "Date",
        serialize: (value) => {
            if (!(value instanceof Date)) {
                throw new TypeError("Scalar Date cannot represent non Date instance");
            }

            return value.toISOString();
        },
        parseValue: (value) => {
            if (typeof value !== "string") {
                throw new TypeError("Scalar Date cannot represent non string type");
            }

            return new Date(value);
        },
        parseLiteral: (ast) => {
            if (ast.kind !== Kind.STRING) {
                throw new TypeError("Scalar Date cannot represent non string kind");
            }

            return new Date(ast.value);
        },
    }),
};
