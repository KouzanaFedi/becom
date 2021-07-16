import { InvoiceTemplate } from "../schema/invoices/invoiceTemplate";
import { processUploadInvoiceImages } from "../utils/fileUpload";
import { fullCalendarDateFormat, serializeMongoDocument } from "../utils/util";
import fs from 'fs';
import path from "path";

export const invoiceResolver = {
    Query: {
        invoiceTemplates: async (_, args) =>
        {
            const result = [];
            await InvoiceTemplate.find({}, (_, templates) =>
            {
                if (templates.length > 0) {
                    templates.forEach((template) =>
                    {
                        const finalRes = serializeMongoDocument(template);
                        finalRes.createdAt = fullCalendarDateFormat(template.createdAt);
                        finalRes.updatedAt = fullCalendarDateFormat(template.updatedAt);
                        result.push(finalRes);
                    });
                }
            });

            return result;
        },
        invoicesImages: async (_, args) =>
        {
            const BASE_DIR = path.resolve(__dirname, '..', '..', 'public');

            const result = [];
            fs.readdirSync(BASE_DIR + '/invoiceImages').forEach(
                file =>
                {
                    result.push('invoiceImages/' + file);
                });
            return { images: result };
        }
    },
    Mutation: {
        createInvoiceTemplate: async (_, args) =>
        {
            const { templateName, image, invoiceType, sender: { web, email, phone, street, address, entreprise }, additionalInfo: { country, entrepriseType, rc, matFisc } } = args;
            const imageUpload = await args.imageUpload;
            let imageUploaded;

            if (imageUpload) {
                imageUploaded = await processUploadInvoiceImages(imageUpload);
            }

            const invoiceTemplate = await InvoiceTemplate.create({
                templateName,
                image: imageUploaded ? 'invoiceImages/' + imageUploaded.id : image,
                invoiceType,
                sender: {
                    web,
                    email,
                    phone,
                    street,
                    address,
                    entreprise,
                },
                additionalInfo: {
                    country,
                    entrepriseType,
                    rc,
                    matFisc,
                },
            });
            return {
                id: invoiceTemplate._id,
                createdAt: fullCalendarDateFormat(invoiceTemplate.createdAt),
                updatedAt: fullCalendarDateFormat(invoiceTemplate.updatedAt),
                image: invoiceTemplate.image
            }
        },
        updateInvoiceTemplate: async (_, args) =>
        {
            const { id, templateName, image, invoiceType, sender: { web, email, phone, street, address, entreprise }, additionalInfo: { country, entrepriseType, rc, matFisc } } = args;
            const imageUpload = await args.imageUpload;
            let imageUploaded;

            if (imageUpload) {
                imageUploaded = await processUploadInvoiceImages(imageUpload);
            }

            const invoiceTemplate = await InvoiceTemplate.findByIdAndUpdate(id, {
                $set: {
                    templateName,
                    image: imageUploaded ? 'invoiceImages/' + imageUploaded.id : image,
                    invoiceType,
                    sender: {
                        web,
                        email,
                        phone,
                        street,
                        address,
                        entreprise,
                    },
                    additionalInfo: {
                        country,
                        entrepriseType,
                        rc,
                        matFisc,
                    },
                }
            }, { new: true });
            return {
                id: invoiceTemplate._id,
                createdAt: fullCalendarDateFormat(invoiceTemplate.createdAt),
                updatedAt: fullCalendarDateFormat(invoiceTemplate.updatedAt),
                image: invoiceTemplate.image
            }
        },
        deleteInvoiceTemplate: async (_, args) =>
        {
            const { id } = args;
            await InvoiceTemplate.findByIdAndDelete(id);
            return {
                succes: true
            }
        }
    }
};
