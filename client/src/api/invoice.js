import { gql } from "@apollo/client";

export const INVOICE_TEMPLATES = gql`
  query InvoiceTemplates{
    invoiceTemplates {
        id
        templateName
        image
        invoiceType
        sender {
        web
        email
        phone
        street
        address
        entreprise
        }
        additionalInfo {
        country
        entrepriseType
        rc
        matFisc
        }
        createdAt
        updatedAt
    }
  }
`;