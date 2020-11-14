import { FileController } from './File/file.controller';
import { URLController } from './URL/url.controller'

const fileController = new FileController();
const urlController = new URLController();

export {
    fileController,
    urlController
};