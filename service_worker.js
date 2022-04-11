const cacheName ="cache123456";//캐시 이름 선언
const cacheFiles = ['./','./index.html','./manifest.json', './pwa512.png'];// 캐시할 리소스

//서비스워커 설치하고 캐시파일 저장
self.addEventListener('install', event => {
  event.waitUntil(
      caches
      .open(cacheName)
      .then(cache => {
        // cacheName 에 addAll 메소드로 캐싱할 리소스를 다 넣어줌
        return cache.addAll(cacheFiles);
      })
      .then(() => {
        // 설치 후 바로 활성화 단계로 들어가게 해줌
        return self.skipWaiting();
      })
  );
});

// 서비스워커 작동 시작(활성화)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(key => {
      // 불필요한 캐시는 삭제해줌 (현재 캐시와 이름이 다른 캐시 삭제)
      return Promise.all(key.map(k => {
        if(k !== cacheName) {
          return caches.delete(k);
        }
      }))
    })
  )
});


// 어딘가에서 리소스를 가져올때 실행됨
// 데이터 요청시 네트워크 또는 캐시에서 찾아 반환 
self.addEventListener('fetch', event => {
    event.respondWith(
      caches
      .match(event.request)
      .then(response => {
        // 요청된 내용이 캐시에 있으면 캐싱한 데이터 제공, 아니면 fetch 시킴
        return response || fetch(event.request)
      }).catch(err => 
        console.log(err)
      )
    );
  });