import { createSlice } from "@reduxjs/toolkit";
import { isNonNullType } from "graphql";
import { IMAGE_ENDPOINT } from "../../../config";

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        pages: null,
        templateData: {
            logo: `${IMAGE_ENDPOINT}1625134789350.png`,
            invoiceType: "Proposition commerciale",
            generalInfo: {
                ref: "PR2106-0019",
                date: "18/06/2021",
                deadline: "03/07/2021",
                clientCode: "CU2106-00023"
            },
            sender: {
                entreprise: "Comguru Production",
                street: "Avenue des orangers",
                address: "4051 Khezema Sousse",
                phone: "73240771",
                email: "contact@comguru.tn",
                web: "www.comguru.tn",
            },
            additionalInfo: {
                country: 'Tunisie',
                entrepriseType: 'Société à responsabilité limitée (SARL)',
                rc: 'B914882021',
                matFisc: '1699684/B/A/M/000'
            },
        },
        data: {
            logo: `${IMAGE_ENDPOINT}1625134789350.png`,
            invoiceType: "Proposition commerciale",
            generalInfo: {
                ref: "PR2106-0019",
                date: "18/06/2021",
                deadline: "03/07/2021",
                clientCode: "CU2106-00023"
            },
            sender: {
                entreprise: "Comguru Production",
                street: "Avenue des orangers",
                address: "4051 Khezema Sousse",
                phone: "73240771",
                email: "contact@comguru.tn",
                web: "www.comguru.tn",
            },
            receiver: {
                entreprise: "SOTUDIS",
                address: "Parc industriel de Ben Arous GP1 , KM 5,5 BP 211-2013",
                city: "Ben Arous",
                matFis: "856180B/A/M/000"
            },
            additionalInfo: {
                country: 'Tunisie',
                entrepriseType: 'Société à responsabilité limitée (SARL)',
                rc: 'B914882021',
                matFisc: '1699684/B/A/M/000'
            },
            items: [
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: ' de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: ' Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage\n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: '4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: ' de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: ' Journées de Tournage \n 4 Journées de Tournage4 Journées de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: ' de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: ' de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                },
                {
                    designtion: ' de Tournage ',
                    tva: 19,
                    pu: 1700,
                    quantity: 40,
                    total: 6800
                }
            ],
        },
        invoiceTemplates: [],
        invoiceTemplatesImages: [],
        editTabData: {
            id: null,
            image: null,
            invoiceType: 'devis',
            createdAt: null,
            additionalInfo: {
                country: null,
                entrepriseType: null,
                matFisc: null,
                rc: null,
            }
            , sender: {
                address: null,
                email: null,
                entreprise: null,
                phone: null,
                street: null,
                web: null,
            },
            templateName: null,
            updatedAt: null
        }
    },
    reducers: {
        SET_PDF_PAGES: (state, action) =>
        {
            state.pages = action.payload.pages;
        },
        SET_INVOICE_ENTREPRISE: (state, action) =>
        {
            state.data.entreprise = action.payload.entreprise;
        },
        INIT_INVOICE_TEMPLATE: (state, action) =>
        {
            if (action.payload.length > 0) {
                const invoices = [];
                const invoiceImages = [];
                if (action.payload.length > 0) {
                    action.payload.forEach(element =>
                    {
                        const { id, image, invoiceType, createdAt, additionalInfo: { country, entrepriseType, matFisc, rc }, sender: { address, email, entreprise, phone, street, web }, templateName, updatedAt } = element;

                        invoices.push({
                            id, image, invoiceType, createdAt, additionalInfo: { country, entrepriseType, matFisc, rc }, sender: { address, email, entreprise, phone, street, web }, templateName, updatedAt
                        })
                        invoiceImages.push({ image, name: templateName });
                    });

                    state.invoiceTemplates = [...invoices];
                    state.invoiceTemplatesImages = [...invoiceImages];
                }
            }
        },
        INTI_INVOICE_TEMPLATE_EDIT_DATA: (state, action) =>
        {
            const { templateId } = action.payload;
            const index = state.invoiceTemplates.findIndex((item) => item.id === templateId);
            state.editTabData = { ...state.invoiceTemplates[index] };
        },
        UPDATE_INVOICE_TEMPLATE_EDIT_DATE: (state, action) =>
        {
            state.editTabData = { ...action.payload };
        },
        RESET_INVOICE_TEMPLATE_EDIT_DATE: (state, _) =>
        {
            state.editTabData = {
                id: null,
                image: null,
                invoiceType: 'devis',
                createdAt: null,
                additionalInfo: {
                    country: null,
                    entrepriseType: null,
                    matFisc: null,
                    rc: null,
                }
                , sender: {
                    address: null,
                    email: null,
                    entreprise: null,
                    phone: null,
                    street: null,
                    web: null,
                },
                templateName: null,
                updatedAt: null
            };
        }
    }
});

export default invoiceSlice.reducer;

export const { SET_PDF_PAGES, SET_INVOICE_ENTREPRISE, INIT_INVOICE_TEMPLATE, INTI_INVOICE_TEMPLATE_EDIT_DATA, UPDATE_INVOICE_TEMPLATE_EDIT_DATE, RESET_INVOICE_TEMPLATE_EDIT_DATE } = invoiceSlice.actions;

export const invoiceData = (state) => state.invoice.data;
export const invoicePages = (state) => state.invoice.pages;
export const invoiceTemplatesData = (state) => state.invoice.invoiceTemplates;
export const invoiceTemplatesImagesData = (state) => state.invoice.invoiceTemplatesImages;
export const invoiceEditTabData = (state) => state.invoice.editTabData;
export const invoiceTemplateData = (state) => state.invoice.templateData;