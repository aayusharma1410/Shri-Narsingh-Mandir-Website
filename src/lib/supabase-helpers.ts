import { supabase } from './supabase';

/**
 * Creates the necessary database tables if they don't already exist
 */
export async function ensureDatabaseSetup() {
  try {
    console.log('Setting up database tables...');
    
    // Check if gallery_images table exists and create if not
    const { data: galleryCheck, error: galleryError } = await supabase
      .from('gallery_images')
      .select('id')
      .limit(1);
    
    if (galleryError && galleryError.code !== 'PGRST116') {
      console.error('Error checking gallery_images table:', galleryError);
      await createGalleryTable();
    } else {
      console.log('Gallery images table exists');
    }
    
    // Check if darshan_images table exists and create if not
    const { data: darshanCheck, error: darshanError } = await supabase
      .from('darshan_images')
      .select('id')
      .limit(1);
    
    if (darshanError && darshanError.code !== 'PGRST116') {
      console.error('Error checking darshan_images table:', darshanError);
      await createDarshanTable();
    } else {
      console.log('Darshan images table exists');
    }
    
    // Check if notices table exists and create if not
    const { data: noticesCheck, error: noticesError } = await supabase
      .from('notices')
      .select('id')
      .limit(1);
    
    if (noticesError && noticesError.code !== 'PGRST116') {
      console.error('Error checking notices table:', noticesError);
      await createNoticesTable();
    } else {
      console.log('Notices table exists');
    }
    
    // Check if user_details table exists and create if not
    const { data: userDetailsCheck, error: userDetailsError } = await supabase
      .from('user_details')
      .select('id')
      .limit(1);
    
    if (userDetailsError && userDetailsError.code !== 'PGRST116') {
      console.error('Error checking user_details table:', userDetailsError);
      await createUserDetailsTable();
    } else {
      console.log('User details table exists');
    }
    
    // Check for and create admin account if needed
    await ensureAdminAccount();
    
    console.log('Database check complete');
  } catch (error) {
    console.error('Error checking database setup:', error);
  }
}

async function createUserDetailsTable() {
  try {
    const { error } = await supabase.rpc('create_user_details_table');
    if (error) throw error;
    console.log('User details table created');

    // Set up RLS policies for user_details table
    await supabase.rpc('setup_user_details_policies');
    console.log('User details policies created');
  } catch (error) {
    console.error('Error creating user_details table:', error);
    console.log('Please run the setup_tables.sql script in the Supabase SQL Editor.');
  }
}

async function createGalleryTable() {
  try {
    const { error } = await supabase.rpc('create_gallery_images_table');
    if (error) throw error;
    console.log('Gallery images table created');

    // Set up RLS policies for gallery_images table
    await supabase.rpc('setup_gallery_images_policies');
    console.log('Gallery images policies created');
  } catch (error) {
    console.error('Error creating gallery_images table:', error);
    console.log('Please run the setup_tables.sql script in the Supabase SQL Editor.');
  }
}

async function createDarshanTable() {
  try {
    const { error } = await supabase.rpc('create_darshan_images_table');
    if (error) throw error;
    console.log('Darshan images table created');

    // Set up RLS policies
    await supabase.rpc('setup_darshan_images_policies');
    console.log('Darshan images policies created');
  } catch (error) {
    console.error('Error creating darshan_images table:', error);
    console.log('Please run the setup_tables.sql script in the Supabase SQL Editor.');
  }
}

async function createNoticesTable() {
  try {
    const { error } = await supabase.rpc('create_notices_table');
    if (error) throw error;
    console.log('Notices table created');

    // Set up RLS policies
    await supabase.rpc('setup_notices_policies');
    console.log('Notices policies created');
  } catch (error) {
    console.error('Error creating notices table:', error);
    console.log('Please run the setup_tables.sql script in the Supabase SQL Editor.');
  }
}

/**
 * Ensures that an admin account exists
 */
export async function ensureAdminAccount() {
  const adminEmail = 'shrilakshminarsinghhasampur@gmail.com';
  const adminPassword = '7073990477@As';
  
  try {
    // Check if admin user exists
    const { data: adminUser, error: adminError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    });

    if (adminError) {
      // Admin doesn't exist, create account
      console.log('Admin account not found, attempting to create it...');
      
      const { data: newAdminData, error: createError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            username: 'admin',
            is_admin: true
          }
        }
      });
      
      if (createError) throw createError;
      
      console.log('Admin account created successfully!');
      
      // Update the user_details table to mark the user as admin
      if (newAdminData.user) {
        try {
          // We need to directly execute SQL for this operation
          const { error: rpcError } = await supabase.rpc('make_user_admin', { 
            user_id: newAdminData.user.id 
          });
          
          if (rpcError) throw rpcError;
          
          console.log('Admin role assigned successfully!');
        } catch (error) {
          console.error('Error adding admin to user_details:', error);
        }
      }
    } else {
      // Admin exists, ensure they have admin flag set
      if (adminUser.user) {
        try {
          const { error: rpcError } = await supabase.rpc('make_user_admin', { 
            user_id: adminUser.user.id 
          });
          
          if (rpcError) {
            console.error('Error updating admin status:', rpcError);
          } else {
            console.log('Admin status verified');
          }
        } catch (error) {
          console.error('Error verifying admin status:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error ensuring admin account:', error);
  }
}

/**
 * Updates the language preference for a user
 */
export async function updateUserLanguagePreference(userId: string, language: 'en' | 'hi') {
  try {
    // First check if user exists in user_details
    const { data: existingUser } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (!existingUser) {
      // If user doesn't exist, get their info and create entry
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        const email = userData.user.email || '';
        const username = userData.user.user_metadata?.username || email.split('@')[0] || 'user';
        
        await supabase
          .from('user_details')
          .insert([
            { 
              user_id: userId, 
              email,
              username,
              language_preference: language
            }
          ]);
      }
    } else {
      // Update existing user's language preference
      await supabase
        .from('user_details')
        .update({ language_preference: language })
        .eq('user_id', userId);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating language preference:', error);
    return false;
  }
}

/**
 * Check if a user is an admin
 */
export async function isUserAdmin(userId: string | undefined): Promise<boolean> {
  if (!userId) return false;
  
  try {
    // First try to get admin status through RPC function
    const { data: isAdmin, error: rpcError } = await supabase.rpc('is_user_admin', { 
      user_id: userId 
    });
    
    if (rpcError) {
      console.error('Error checking admin status through RPC:', rpcError);
      
      // Fallback: directly query the database
      const { data, error } = await supabase
        .from('user_details')
        .select('is_admin')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return !!data?.is_admin;
    }
    
    return !!isAdmin;
  } catch (error) {
    console.error('Error in isUserAdmin function:', error);
    return false;
  }
}

/**
 * Upload an image to Supabase storage
 */
export async function uploadImage(
  file: File, 
  bucket: string, 
  folderPath: string = ''
): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage function:', error);
    return null;
  }
}
