# Software Studio 2022 Spring Midterm Project

### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Membership Mechanism                             | 15%       | Y         |
| Firebase page                                    | 5%        | Y         |
| Database read/write                              | 15%       | Y         |
| RWD                                              | 15%       | Y         |
| Chatroom                                         | 20%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Using React                                      | 10%       | Y         |
| Third-Party Sign In                              | 1%        | Y         |
| Notification                                     | 5%        | N         |
| CSS Animation                                    | 2%        | Y         |
| Security                                         | 2%        | Y         |

| **Other useful functions**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| User Profile                                  | 1%     | Y         |
| Profile Picture                                 | 1%     | Y         |
| Send Image                                  | 1%     | Y         |

---

### How to use 

    Describe how to use your web and maybe insert images or gifs to help you explain.
    
#### Membership Mechanism
![](https://i.imgur.com/nMM3fMn.png)
當用戶還沒登入時，使用者就算點擊Navbar也只會停留在登入畫面。
1. 使用估狗登入時或註冊時，估狗帳號的名稱就是聊天室內使用的名稱。
2. 使用信箱註冊時使用'@'前的字串為聊天室用戶名稱
3. 登入失敗會用alert顯示錯誤信息

#### 首頁畫面
![](https://i.imgur.com/gCCRGcK.jpg)
* CSS動畫有使用淡入特效
1. 首頁畫面顯示可以私訊的好友列表
2. 點擊後可以進入私聊畫面
#### 私聊畫面
![](https://i.imgur.com/oyQbsXy.jpg)
1. 可顯示歷史所有對話紀錄和傳送的時間
2. 點擊右下角"選擇檔案"可以傳送照片(需等待約五秒)
3. 若在頁面上方傳送訊息，會自動讓頁面scroll到最新訊息處
4. 不能傳送length<1的字串
#### 建立聊天室
![](https://i.imgur.com/bZgoaHO.png)
* 有用奇怪的CSS動畫
1. 可以搜尋好友ID來創建私人聊天室
2. 送出邀請後對方須同意才能成為好友
3. 下方顯示"正在邀請" 和 "收到的邀請"
4. 接受邀請後，首頁好友列表會自動增加
![](https://i.imgur.com/XgH4jKF.jpg)

#### 個人檔案(Profile)
![](https://i.imgur.com/1Pl6SAN.jpg)
1. 點擊copy code可以複製自己的ID給別人
2. 畫面顯示自己的大頭貼與暱稱

#### 廣場畫面
![](https://i.imgur.com/eh6GBq4.jpg)
1. 聊天室可以傳送html
2. 所有用戶都可以在廣場傳送訊息及看到歷史留言
3. 用戶下紅色的亂碼是他們的用戶ID，可用於好友申請

#### database rules




### Function description

    Describe your bonus function and how to use it.
#### 用戶Profile
增加一個Profile頁面，將用戶的個人資料顯示在這個頁面

#### 傳送image
![](https://i.imgur.com/j3n9F8a.png)
先將選擇的檔案傳到storage
傳送圖片時將message=""和圖片url傳進database
使用react，在message===""時，使用image標籤和photoURL打印出圖片
    

### Firebase page link
[chat-mid-4.web.app](https://chat-mid-4.web.app)

    chat-mid-4.web.app

### Others (Optional)

    i just want to sleep.
    
    
    
    

<style>
table th{
    width: 100%;
}
</style>