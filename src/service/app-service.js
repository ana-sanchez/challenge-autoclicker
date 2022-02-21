import { openDB, deleteDB } from 'idb';
import { Router } from '@vaadin/router';


export function getLogStatus(){
  if(localStorage.getItem('LogStatus') === 200) return true
  return false;
}

export function getCurrentUser(){
  const user = localStorage.getItem('current_user')
  return user

}

// Save User data data when logging in
export function saveUser(data){
  return new Promise((res, rej) => {
    const db = openDB('user-db', 1, {
      upgrade(db, oldVersion, newVersion) {
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
        await store.add(data);
        res();
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
  localStorage.clear()
  window.location.reload();
}

export function getData(database, storename){
  return new Promise(async(res, rej) => {
    checkIDB(database)
    .then(async dbExists => {
      if(dbExists){
        const db = await openDB(database);
        const tx = db.transaction(storename, 'readonly');
        const store = tx.objectStore(storename);
        await store.getAll().then(request => { res(request) })
        await tx.done;
      }else{
        captureException();
      }
    }).catch((err) => {
      console.log(err)
    });
  });
}


export function getDataByName(key, database, storename){
  return checkIDB(database)
  .then(async dbExists => {
    if(dbExists){
      const db = openDB(database);
      const request = db.then(async idb => {
        const data = await idb.getFromIndex(storename, 'user', key);
        return data;
      })
      return request;
    }
      captureException();

  }).catch((err) => {
    console.log(err)
  });
}

export function addData(data, database, storename){
  return new Promise(async(res, rej) => {
    checkIDB(database)
    .then(async dbExists => {
      if(dbExists){
        const db = await openDB(database);
        const tx = db.transaction(storename, 'readwrite');
        const store = tx.objectStore(storename);
        await store.add(data)
        await store.getAll().then(request => { res(request) })
        await tx.done;
      }else{
        captureException();
      }
    }).catch((err) => {
      console.log(err);
    });
  });
}

export function setData(data, database, storename){
  return new Promise(async(res, rej) => {
    checkIDB(database)
    .then(async dbExists => {
      if(dbExists){
        const db = await openDB(database);
        const tx = db.transaction(storename, 'readwrite');
        const store = tx.objectStore(storename);
        await store.put(data);
        await store.getAll().then(request => { res(request) })
        await tx.done;
      }else{
        captureException();
      }
    }).catch((err) => {
      console.log(err)
    });
  });
}
