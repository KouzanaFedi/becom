import { createWriteStream, existsSync, mkdirSync, statSync } from "fs";
import path from 'path';

const BASE_DIR = path.resolve(__dirname, '..', '..', 'public');

export const storeUpload = async ({ stream, filename, mimetype }, folder) =>
{

    const id = `${new Date().getTime()}${path.extname(filename)}`;

    const filePath = `${BASE_DIR}${folder !== undefined && folder}`;

    if (folder !== undefined) {
        if (!existsSync(filePath)) {
            mkdirSync(filePath, { recursive: true });
        }
    }

    const src = `${folder !== undefined && folder}/${id}`
    const _path = path.resolve(filePath, id);

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(_path))
            .on("finish", () => resolve({ id, path, filename, mimetype, src }))
            .on("error", reject)
    );
};

export const processUpload = async (upload, folder) =>
{
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype }, folder);
    return file;
};

export const getFileUploadedSize = (path) =>
{
    const filePath = `${BASE_DIR}${path}`;
    const { size } = statSync(filePath);
    return size;
};
