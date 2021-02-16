export class IndexedDB {
    init() {
      return new Promise((resolve, reject) => {
        try {
          let req = window.indexedDB.open('advance_notepad_db', 4);
  
          req.onsuccess = event => {
            // console.log('onsuccess', event);
            this.db = event.target.result;
            resolve(true);
          };
  
          req.onerror = event => {
            console.error('IndexedDB error', event);
            reject('IndexedDB error');
          };
  
          req.onupgradeneeded = event => {
            // console.log('onupgradeneeded', event);
            this.db = event.target.result;
            this.transaction = event.target.transaction;
            if (this.transaction.mode === 'versionchange') {
              reject('versionchange_inprogress');
            }
  
            if (
              this.db.objectStoreNames &&
              !this.db.objectStoreNames.contains('TODOS')
            ) {
              this.db.createObjectStore('TODOS', {
                keyPath: 'formId',
                autoIncrement: true,
              });
            }
            if (
              this.db.objectStoreNames &&
              !this.db.objectStoreNames.contains('NOTES')
            ) {
              this.db.createObjectStore('NOTES', {
                keyPath: 'formId',
                autoIncrement: true,
              });
            }
                    
            if (
              this.db.objectStoreNames &&
              !this.db.objectStoreNames.contains('TODOS_ONLINE')
            ) {
              this.db.createObjectStore('TODOS_ONLINE', {
                keyPath: 'formId',
                autoIncrement: true,
              });
            }
            if (
              this.db.objectStoreNames &&
              !this.db.objectStoreNames.contains('NOTES_ONLINE')
            ) {
              this.db.createObjectStore('NOTES_ONLINE', {
                keyPath: 'formId',
                autoIncrement: true,
              });
            }
            resolve(true);
          };
        } catch (e) {
          console.error('Exception', e);
          reject('IndexedDB error');
        }
      });
    }
  
    insertTableRecord(TableName, data) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([TableName], 'readwrite');
        let os = trans.objectStore(TableName);
        let req = os.add(data);
        req.onsuccess = event => {
          // console.log('Success', event.target.result);
          resolve(event.target.result);
        };
        req.onerror = event => {
          console.log('Error', event);
          reject(event);
        };
      });
    }
  
    removeTableRecord(tableName) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([tableName], 'readwrite');
        let os = trans.objectStore(tableName);
        let req = os.clear();
        req.onsuccess = event => {
          resolve(event.target.result);
        };
        req.onerror = event => {
          reject(event);
        };
      });
    }
  
    //TODO: Check for existence and delete
    deleteRecord(tableName, key) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([tableName], 'readwrite');
        let os = trans.objectStore(tableName);
        let req = os.delete(key);
        req.onsuccess = event => {
          resolve(event.target.result);
        };
        req.onerror = event => {
          reject(event);
        };
      });
    }
  
    updateTableRecord(tableName, data) {
      // This also handles insert if item doesn't exist
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([tableName], 'readwrite');
        let os = trans.objectStore(tableName);
        let req = os.put(data);
        req.onsuccess = event => {
          resolve(event.target.result);
        };
        req.onerror = event => {
          reject(event);
        };
      });
    }
  
    fetch(tableName, key) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([tableName], 'readonly');
        let os = trans.objectStore(tableName);
        let req = os.get(key);
        req.onsuccess = event => {
          resolve(req.result || null);
        };
        req.onerror = event => {
          reject(event);
        };
      });
    }
  
    fetchAll(tableName) {
      return new Promise((resolve, reject) => {
        let result = [];
        let trans = this.db.transaction([tableName], 'readonly');
        let os = trans.objectStore(tableName);
        let req = os.openCursor(null, 'prev');
  
        req.onsuccess = event => {
          let cursor = event.target.result;
          if (cursor) {
            result.push(cursor.value);
            cursor.continue();
          } else {
            console.log('result' + result);
            resolve(result);
          }
        };
  
        req.onerror = event => {
          reject(event);
        };
      });
    }
  
    getTableCount(tableName) {
      return new Promise((resolve, reject) => {
        let count = this.db.transaction(tableName, 'readwrite');
        let currentRecord = count.objectStore(tableName);
        var countRequest = currentRecord.count();
        countRequest.onsuccess = function() {
          resolve(countRequest.result);
        };
      });
    }
  }
  