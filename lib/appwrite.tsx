import {
    Account,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.MaxL.HealtyLife",
    projectid: "6693b25100167c495f76",
    databaseid: "6693e601002c4b898f42",
    usercollectionid: "6693e61900215182646e",
    trophyscollectionid: "6693e641001296914da8",
    storageid: "6693e715001de1e3d145"
}




const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectid)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

// Register user
export async function createUser(email: string, password: string, username: string | undefined) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error('Account creation failed');

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseid,
      appwriteConfig.usercollectionid,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email: email,
        username: username,
      }
    );
    console.log(newUser, "tehty uusi käyttäjä")

    return newUser;
  } catch (error) {
    console.log(error, "kerro");
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error, "terve");
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount)
    return currentAccount;
  } catch (error) {
    console.log(error, "hei");
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    console.log("getuser")
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error('No account found');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseid,
      appwriteConfig.usercollectionid,
      [Query.equal("accountid", currentAccount.$id)]
    );

    if (!currentUser) throw new Error('No user found');
    console.log(currentUser)
    return currentUser.documents[0];
  } catch (error) {
    console.log(error ,"moi");
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}