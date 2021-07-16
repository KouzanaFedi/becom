import { gql } from 'apollo-server-express';

export const invoice = gql`
    type Query {
      invoiceTemplates: [InvoiceTemplate!]!
      invoicesImages: invoiceImagesResult
  }

    type Mutation {
      createInvoiceTemplate(templateName: String!, image: String, imageUpload: Upload, invoiceType: String!,sender: Sender!, additionalInfo: AdditionalInfo!): InvoiceTemplateResponse

      updateInvoiceTemplate(id: String!, templateName: String!, image: String, imageUpload: Upload, invoiceType: String!,sender: Sender!, additionalInfo: AdditionalInfo!): InvoiceTemplateResponse

      deleteInvoiceTemplate(id: String!): BasicResponse
  }
`;