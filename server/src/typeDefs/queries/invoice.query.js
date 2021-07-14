import { gql } from 'apollo-server-express';

export const invoice = gql`
    type Query {
      invoiceTemplates: [InvoiceTemplate!]!
  }

    type Mutation {
      createInvoiceTemplate(templateName: String!, image: String, imageUpload: Upload, invoiceType: String!,sender: Sender!, additionalInfo: AdditionalInfo!):InvoiceTemplateResponse
  }
`;