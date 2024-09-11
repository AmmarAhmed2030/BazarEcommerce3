import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImageUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  bannerImageUploader: f({ image: { maxFileSize: '2MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  marketLogoUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  productImageUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  trainingImageUploader: f({ image: { maxFileSize: '2MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  farmerImageUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  farmerProfileUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  userProfileUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  customerImageUploader: f({ image: { maxFileSize: '1MB' } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
  multipleImageUploader: f({ image: { maxFileSize: '8MB', maxFileCount: 4 } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('file url', file.url, metadata);
      return { uploadedBy: metadata.userId };
    }),
};
