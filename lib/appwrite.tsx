import {
    Account,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
import { getRandomTrophy } from "./trophies";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.MaxL.HealtyLife",
    projectid: "6693b25100167c495f76",
    databaseid: "6693e601002c4b898f42",
    usercollectionid: "6693e61900215182646e",
    trophyscollectionid: "6693e641001296914da8",
    storageid: "6693e715001de1e3d145",
    taskcollectionid: "6698ddaf00314e15a246",
    pointscollectionid: "669d3634003d5634278a",
}



const getCurrentDate = () => {
  const now = new Date();
  console.log(now);
  return now.toISOString(); // or any other format you prefer
};

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
        token: 0,
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
        trophy: trophy.name,
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
        imageSource: task.imageSource,
        done: false, 
        date: getCurrentDate(),
      }
    );

    console.log('Task saved successfully:', response);
  } catch (error) {
    console.error('Error saving task:', error);
  }
};



export const updateTaskStatus = async (taskid, isChecked) => {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseid, 
      appwriteConfig.taskcollectionid, 
      taskid,
      {
      done: isChecked
    });
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

export const updateTaskStatusDate = async (taskid, isChecked, date) => {
  try {
    console.log(`Updating task ${taskid} with done: ${isChecked} and date: ${date}`);
    await databases.updateDocument(
      appwriteConfig.databaseid, 
      appwriteConfig.taskcollectionid, 
      taskid,
      {
      done: isChecked,
      date: date
    });
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};


export async function removeTask(taskid) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseid,
      appwriteConfig.taskcollectionid,
      taskid
    );
    
  } catch (error) {
    console.log("error poistaeesa taskia", error)
    
  }
  
};





export async function handleTokens(amount) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    console.log("User not logged in");
    return;
  }

  try {
    // Retrieve the current user's document
    const userDocument = await fetchUserdocument(currentUser.$id)

    // Calculate the new token balance
    const newTokenBalance = (userDocument.token || 0) + amount;
    console.log(newTokenBalance);

    // Update the user document with the new token balance
    const updatedUserDocument = await databases.updateDocument(
      appwriteConfig.databaseid,
      appwriteConfig.usercollectionid,
      currentUser.$id, 
      { token: newTokenBalance }
    );

    console.log("Token balance updated successfully", updatedUserDocument);
  } catch (error) {
    console.log("Error updating token balance", error);
  }
}

export async function fetchUserdocument($id) {
  
  const userDocument = await databases.getDocument(
    appwriteConfig.databaseid,
    appwriteConfig.usercollectionid,
    $id 
  );

  

  if (!userDocument) {
    console.log("User document not found");
    return;
  }
  return userDocument;
};
//kesken
export async function removeChest(chestid) {
  const chest
  
}