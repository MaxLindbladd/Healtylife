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
    storageid: "6693e715001de1e3d145",
    taskcollectionid: "6698ddaf00314e15a246",
}

const trophies = [
  "Trophy 1",
  "Trophy 2",
  "Trophy 3",
  "Trophy 4",
  "Trophy 5",
  "Trophy 6",
  "Trophy 7",
  "Trophy 8",
  "Trophy 9",
  "Trophy 10",
];


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



function getRandomTrophy() {
  const randomIndex = Math.floor(Math.random() * trophies.length);
  return trophies[randomIndex];
}

async function saveTrophy() {
  const trophy = getRandomTrophy();
  
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('No user found');

    const response = await databases.createDocument(
      appwriteConfig.databaseid,
      appwriteConfig.trophyscollectionid,
      ID.unique(),
      {
        userid: currentUser.$id,
        trophy: trophy,
      }
    );
    console.log('Trophy saved:', response);
  } catch (error) {
    console.error('Error saving trophy:', error);
  }
}

export { saveTrophy };

async function getUserTrophies(userid) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseid,
      appwriteConfig.trophyscollectionid,
      [Query.equal("userid", userid)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching trophies:', error);
    return [];
  }
}

export { getUserTrophies };


async function getUserTask(userid) {
  try {
    console.log("haetaan taskeja");
    const response = await databases.listDocuments(
      appwriteConfig.databaseid,
      appwriteConfig.taskcollectionid,
      [Query.equal("userid", userid)]
    );
    return response.documents
  } catch (error) {
    console.log("error fetching tasks:", error);
    return[];
  }
  
}
export { getUserTask};



export const saveTask = async (task) => {
  try {

    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('No user found');

    console.log(task.period,task.imageSource);
    const response = await databases.createDocument(
      appwriteConfig.databaseid, 
      appwriteConfig.taskcollectionid,
      ID.unique(), 
      {
        userid: currentUser.$id,
        title: task.title,
        period: task.period,
        imageSource: task.imageSource 
      }
    );

    console.log('Task saved successfully:', response);
  } catch (error) {
    console.error('Error saving task:', error);
  }
};