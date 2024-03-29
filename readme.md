# API Document

### Get start

    run ```npm install```

### 0 login


请求格式：

    method: POST
    Content-type: application/json
    url: /login
    data: {
        id: "1231312313",
        name:"xxx",
        password: "sdufh2398fh"
    }

响应格式：

    body: {
        status: 状态码,
        token: "Token for identity"
    }

### 1. addBorrow_card

增加借书卡
    卡号, 姓名, 单位, 类别 (教师 学生)

请求格式：

    method： POST
    Content-type: application/json
    url: /addcard
    data: {
        name:"肥猫",
        department:"大肥猫学院",
        type:"T/S",
        token: "Token for identity"
    } 

响应格式：

    Content-type: application/json
    body: {
        status: 一个状态码,
        card_id: x ,
        message:"sucess/fail"
    }

status 状态码及其 message 含义：

| status | message            |
| -----: | :----------------- |
| 1      | OK                 |
| -1     | 失败 |

### 2. addbook

图书入库
    书号, 类别, 书名, 出版社, 年份, 作者, 价格, 数量
请求格式：

    method： POST
    Content-type: application/json
    url: /addBook
    data: {
        book:[
            {
                type:"Computer Sicence",
                bookname:"Database System Introduction",
                publisher:"ZheJiangUniversity",
                year:"1999",
                price:"123.22",
                author:"xxx"
            },
            ...
        ]
        token: "Token for identity"
    } 

响应格式：

    Content-type: application/json
    body: {
        status: 一个状态码,
        bookid: xxx,
        message: "状态说明"
    }

status 状态码及其 message 含义：

| status | message            |
| -----: | :----------------- |
| 1      | OK                 |
| -1     | 失败 |

### 3. select/display

显示某个用户的借书情况

请求格式：

    method: POST
    Content-type: application/json
    url: select/display
    data: {
        card_id: "借书证唯一id",
        token: "Token for identity",
    }

响应格式：

    Content-type: application/json
    body: {
    "status": 1,
    "result": [
        {
            "book_id": 10,
            "type": "novel",
            "bookname": "The Old Curiosity Shop",
            "publisher": "Orcale",
            "year": 2018,
            "author": "Charles John Huffam Dickens",
            "price": 22.15
        },
        ...

    ]
    }


### 4. select/find

更具信息查询数据

请求格式：

    method： POST
    Content-type: application/json
    url: /update/courseData
    data: {
        type:"Computer Sicence",
        bookname:"Database System Introduction",
        publisher:"ZheJiangUniversity",
        year_min:"1999",
        yeasr_max:"2010",
        price_min:"123.22",
        price_max:"999.55",
        order:排序状态码,
        token: "Token for identity"
    } 

响应格式：

    Content-type: application/json
    body: {
    "status": 1,
    "result": [
        {
            "book_id": 10,
            "type": "novel",
            "bookname": "The Old Curiosity Shop",
            "publisher": "Orcale",
            "year": 2018,
            "author": "Charles John Huffam Dickens",
            "price": 22.15
        },
        ...
        
    ]
    }

order 

| order |                  |
| -----: | :----------------------- |
| bookname      | 书名首字母排序                       |
| type     | 类别排序           |
| publisher     | 出版社排序                |
| year     | 出版年份排序 |
| price     | 价格 |

### 5. borrow

借书

请求格式：

    method: POST
    Content-type: application/json
    url: borrow
    data: {
        card_id: "借书证唯一id",
        book_id:"每一本书的唯一id",
        data_borrow:"(now) xxxx-xx-xx",
        data_return:"xxxx-xx-xx",
        admin_name:"sdff",
        token: "Token for identity",
    }

响应格式：

    Content-type: application/json
    body: {
        status: 一个状态码,
        message:""
    }
| status | message            |
| -----: | :----------------- |
| 1      | OK                 |
| -1     | 失败 |

### 6. return

借书

请求格式：

    method: POST
    Content-type: application/json
    url: return
    data: {
        card_id: "借书证唯一id",
        book_id:"每一本书的唯一id"
        token: "Token for identity",
    }

响应格式：

    Content-type: application/json
    body: {
        status: 一个状态码,
        message:""
    }
| status | message            |
| -----: | :----------------- |
| 1      | OK                 |
| -1     | 失败 |