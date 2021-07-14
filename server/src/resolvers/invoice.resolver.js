import { InvoiceTemplate } from "../schema/invoices/invoiceTemplate";
import { processUpload } from "../utils/fileUpload";
import { fullCalendarDateFormat, serializeMongoDocument } from "../utils/util";

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
        }
    },
    Mutation: {
        createInvoiceTemplate: async (_, args) =>
        {
            const { templateName, image, invoiceType, sender: { web, email, phone, street, address, entreprise }, additionalInfo: { country, entrepriseType, rc, matFisc } } = args;
            const imageUpload = await args.imageUpload;
            let imageUploaded;

            if (imageUpload) {
                imageUploaded = await processUpload(imageUpload);
            }

            const invoiceTemplate = await InvoiceTemplate.create({
                templateName,
                image: imageUploaded ? imageUploaded.id : image,
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
    }
};
