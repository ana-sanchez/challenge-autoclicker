import { openDB, deleteDB } from 'idb';
import { logStatus } from '../data/constants.js';

// Save User data data when logging in
export function saveUser(data){
  return new Promise((res) => {
    const db = openDB('user-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('user', {
          keyPath: 'user',
          autoIncrement: true
        });
        store.createIndex('user', 'user', {unique: true});
      }
    });
    db.then(async idb => {
      if(data){
        const store = idb.transaction('user', 'readwrite').objectStore('user');
        await store.put(data);
        res(data);
      }
    })
  })
}

// Check if IDB exists
export function checkIDB(database){
  return new Promise((res, rej) => {
    const db = window.indexedDB.open(database);
    db.addEventListener('upgradeneeded', async (e) => {
      e.target.transaction.abort();
      res(false);
    });

    db.onsuccess = () => res(true);
    db.onerror = () => rej();
  })
}

export async function removeData(database){
  await deleteDB(database);
}

export function captureException(){
  removeData('user-db');
  localStorage.clear();
  window.location.reload();
}

export function getData(database, storename){
  return new Promise((res) => {
    checkIDB(database)
    .then(async dbExists => {
      if(dbExists){
        const db = await openDB(database);
        const tx = db.transaction(storename, 'readonly');
        const store = tx.objectStore(storename);
        await store.getAll().then(request => { res(request) });
        await tx.done;
      }else{
        captureException();
      }
    }).catch((err) => {
      console.log(err);
    });
  });
}

export function getDataByName(key, database, storename){
  return new Promise((res, rej) => {
    checkIDB(database)
    .then(async dbExists => {
      if(dbExists){
        const db =  openDB(database);
        const request = db.then(async idb => {
          const data = await idb.getFromIndex(storename, 'user', key);
          res(data);
          return data
        })
        return request
      }
        rej();
    }).catch((err) => {
      console.log(err);
    });
  });
}

export function setData(data, database, storename){
  return new Promise((res) => {
    checkIDB(database)
    .then(async dbExists => {
      if(dbExists){
        const db = await openDB(database);
        const tx = db.transaction(storename, 'readwrite');
        const store = tx.objectStore(storename);
        await store.put(data);
        await store.getAll().then(request => { res(request) });
        await tx.done;
      }else{
        captureException();
      }
    }).catch((err) => {
      console.log(err);
    });
  });
}

export const saveNewUser = (user, value) => saveUser({user, cookies: value, progress: [0,0,0], })
    .then(res => {
      if(res) {
        window.localStorage.setItem('LogStatus', logStatus);
        window.localStorage.setItem('current_user', user);
        return true
      }
      return false
    })

export const saveCurrentUser = (user) => {
  window.localStorage.setItem('LogStatus', logStatus);
  window.localStorage.setItem('current_user', user);

}

export const saveUserProgress = (user, cookies, progress) => {
    getDataByName(`${user}`, 'user-db','user')
    .then(async res => {
      if(res) {
        res.cookies = cookies;
        res.progress = progress;
        await setData(res, 'user-db', 'user');
      }
    })
  }

export const isUserSaved = (user) => {
 return getDataByName(`${user}`, 'user-db','user')
  .then(res => {
    if(res) {
      return true
    }
    return false
  })

}
