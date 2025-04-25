
// Mock supabase helpers for compatibility

/**
 * Check if a user is an admin
 */
export async function isUserAdmin(userId: string | undefined): Promise<boolean> {
  // Mock implementation
  return false;
}

/**
 * Upload an image to storage
 */
export async function uploadImage(
  file: File, 
  bucket: string, 
  folderPath: string = ''
): Promise<string | null> {
  // Mock implementation
  console.log('Mock image upload:', { file, bucket, folderPath });
  return 'https://picsum.photos/800/600';
}
