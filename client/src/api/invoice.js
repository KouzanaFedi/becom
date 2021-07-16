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
    invoicesImages{
      images
    }
  }
`;

export const UPDATE_INVOICE_TEMPLATES = gql`
  mutation UpdateInvoiceTemplate($id: String!, $templateName: String!, $image: String, $imageUpload: Upload, $invoiceType: String!, $sender: Sender!, $additionalInfo: AdditionalInfo!){
    updateInvoiceTemplate (id: $id, templateName: $templateName, image: $image, imageUpload: $imageUpload, invoiceType: $invoiceType, sender: $sender, additionalInfo: $additionalInfo)
    {
      id
      createdAt
      updatedAt
      image
    }
  }
`;

export const CREATE_INVOICE_TEMPLATES = gql`
  mutation CreateInvoiceTemplate($templateName: String!, $image: String, $imageUpload: Upload, $invoiceType: String!, $sender: Sender!, $additionalInfo: AdditionalInfo!){
    createInvoiceTemplate (templateName: $templateName, image: $image, imageUpload: $imageUpload, invoiceType: $invoiceType, sender: $sender, additionalInfo: $additionalInfo)
    {
      id
      createdAt
      updatedAt
      image
    }
  }
`;

export const DELETE_INVOICE_TEMPLATES = gql`
  mutation DeleteInvoiceTemplate($id: String!){
    deleteInvoiceTemplate (id: $id)
    {
      succes
    }
  }
`;