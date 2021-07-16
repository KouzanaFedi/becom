import { gql } from 'apollo-server-express';

export const invoiceType = gql`

    input Sender {
        web: String!
        email: String!
        phone: Int!
        street: String!
        address: String!
        entreprise: String!
    }

    input AdditionalInfo {
        country: String!
        entrepriseType: String!
        rc: String!
        matFisc: String!
    }

    type InvoiceTemplateResponse {
        id: ID!,
        createdAt: String,
        updatedAt: String,
        image: String!
    }

    type InvoiceTemplate {
        id: ID!,
        templateName: String!,
        image: String!,
        invoiceType: String!,
        sender: SenderType,
        additionalInfo: AdditionalInfoType,
        createdAt: String!,
        updatedAt: String!,
    }

    type SenderType {
        web: String!
        email: String!
        phone: Int!
        street: String!
        address: String!
        entreprise: String!
    }

    type AdditionalInfoType {
        country: String!
        entrepriseType: String!
        rc: String!
        matFisc: String!
    }

    type invoiceImagesResult {
        images : [String!]!
    }
`;
