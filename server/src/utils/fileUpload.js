import { createWriteStream } from "fs";
import path from 'path';

const BASE_DIR = path.resolve(__dirname, '..', '..', 'public');

export const storeUpload = async ({ stream, filename, mimetype }) =>
{

    const id =`${new Date().getTime()}${path.extname(filename)}` ;

    const _path = path.resolve(BASE_DIR, `${id}`);

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(_path))
            .on("finish", () => resolve({ id, path, filename, mimetype }))
            .on("error", reject)
    );
};

export const processUpload = async upload =>
{
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};