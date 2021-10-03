import { Schema, model } from 'mongoose';

const InvoiceTemplateSchema = new Schema({
    templateName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    invoiceType: {
        type: String,
        enum: ['devis', 'facture'],
        required: true,
        default: 'devis'
    },
    sender: {
        web: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        entreprise: {
            type: String,
            required: true,
        },
    },
    additionalInfo: {
        country: {
            type: String,
            required: true,
        },
        entrepriseType: {
            type: String,
            required: true,
        },
        rc: {
            type: String,
            required: true,
        },
        matFisc: {
            type: String,
            required: true,
        }
    }
}, {
    timestamps: true
});

export const InvoiceTemplate = model('invoiceTemplate', InvoiceTemplateSchema);