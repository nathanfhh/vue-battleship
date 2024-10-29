const questionBank = [
  {
    question: "以下哪一項是OWASP Top Ten中的一項？",
    options: ["A. SQL注入", "B. 數據加密", "C. 網站設計", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是CIA三元組中的一項？",
    options: ["A. 機密性", "B. 可用性", "C. 完整性", "D. 以上皆是"],
    answer: "D. 以上皆是",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是SSDL中的一項？",
    options: ["A. 安全需求", "B. 安全設計", "C. 安全測試", "D. 以上皆是"],
    answer: "D. 以上皆是",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡攻擊？",
    options: ["A. DDoS攻擊", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. DDoS攻擊",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全措施？",
    options: ["A. 防火牆", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. 防火牆",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全漏洞？",
    options: ["A. SQL注入", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全攻擊？",
    options: ["A. DDoS攻擊", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. DDoS攻擊",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全措施？",
    options: ["A. 防火牆", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. 防火牆",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全漏洞？",
    options: ["A. SQL注入", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全攻擊？",
    options: ["A. DDoS攻擊", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. DDoS攻擊",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全措施？",
    options: ["A. 防火牆", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. 防火牆",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全漏洞？",
    options: ["A. SQL注入", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全攻擊？",
    options: ["A. DDoS攻擊", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. DDoS攻擊",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全措施？",
    options: ["A. 防火牆", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. 防火牆",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全漏洞？",
    options: ["A. SQL注入", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全攻擊？",
    options: ["A. DDoS攻擊", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. DDoS攻擊",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全措施？",
    options: ["A. 防火牆", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. 防火牆",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全漏洞？",
    options: ["A. SQL注入", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全攻擊？",
    options: ["A. DDoS攻擊", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. DDoS攻擊",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全措施？",
    options: ["A. 防火牆", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. 防火牆",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全漏洞？",
    options: ["A. SQL注入", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全攻擊？",
    options: ["A. DDoS攻擊", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. DDoS攻擊",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全措施？",
    options: ["A. 防火牆", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. 防火牆",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是常見的網絡安全漏洞？",
    options: ["A. SQL注入", "B. 網站設計", "C. 數據加密", "D. 用戶體驗"],
    answer: "A. SQL注入",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是防止SQL注入攻擊的最佳方法？",
    options: ["A. 使用參數化查詢", "B. 使用字符串連接", "C. 使用HTML編碼", "D. 使用JavaScript"],
    answer: "A. 使用參數化查詢",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是防止跨站腳本攻擊（XSS）的最佳方法？",
    options: ["A. 使用HTML編碼", "B. 使用字符串連接", "C. 使用參數化查詢", "D. 使用JavaScript"],
    answer: "A. 使用HTML編碼",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是防止跨站請求偽造（CSRF）的最佳方法？",
    options: ["A. 使用CSRF令牌", "B. 使用字符串連接", "C. 使用參數化查詢", "D. 使用JavaScript"],
    answer: "A. 使用CSRF令牌",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是防止敏感數據暴露的最佳方法？",
    options: ["A. 使用加密", "B. 使用字符串連接", "C. 使用參數化查詢", "D. 使用JavaScript"],
    answer: "A. 使用加密",
    type: "multiple-choice"
  },
  {
    question: "以下哪一項是防止安全錯誤配置的最佳方法？",
    options: ["A. 使用安全配置指南", "B. 使用字符串連接", "C. 使用參數化查詢", "D. 使用JavaScript"],
    answer: "A. 使用安全配置指南",
    type: "multiple-choice"
  },
  {
    question: "SQL注入是一種常見的網絡安全漏洞。",
    answer: true,
    type: "true-false"
  },
  {
    question: "DDoS攻擊是一種常見的網絡安全攻擊。",
    answer: true,
    type: "true-false"
  },
  {
    question: "防火牆是一種常見的網絡安全措施。",
    answer: true,
    type: "true-false"
  },
  {
    question: "數據加密是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "網站設計是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "用戶體驗是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "SQL注入是一種常見的網絡安全攻擊。",
    answer: true,
    type: "true-false"
  },
  {
    question: "DDoS攻擊是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "防火牆是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "數據加密是一種常見的網絡安全攻擊。",
    answer: false,
    type: "true-false"
  },
  {
    question: "網站設計是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "用戶體驗是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "SQL注入是一種常見的網絡安全漏洞。",
    answer: true,
    type: "true-false"
  },
  {
    question: "DDoS攻擊是一種常見的網絡安全攻擊。",
    answer: true,
    type: "true-false"
  },
  {
    question: "防火牆是一種常見的網絡安全措施。",
    answer: true,
    type: "true-false"
  },
  {
    question: "數據加密是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "網站設計是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "用戶體驗是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "SQL注入是一種常見的網絡安全攻擊。",
    answer: true,
    type: "true-false"
  },
  {
    question: "DDoS攻擊是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "防火牆是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "數據加密是一種常見的網絡安全攻擊。",
    answer: false,
    type: "true-false"
  },
  {
    question: "網站設計是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "用戶體驗是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "SQL注入是一種常見的網絡安全漏洞。",
    answer: true,
    type: "true-false"
  },
  {
    question: "DDoS攻擊是一種常見的網絡安全攻擊。",
    answer: true,
    type: "true-false"
  },
  {
    question: "防火牆是一種常見的網絡安全措施。",
    answer: true,
    type: "true-false"
  },
  {
    question: "數據加密是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "網站設計是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "用戶體驗是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "SQL注入是一種常見的網絡安全攻擊。",
    answer: true,
    type: "true-false"
  },
  {
    question: "DDoS攻擊是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "防火牆是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "數據加密是一種常見的網絡安全攻擊。",
    answer: false,
    type: "true-false"
  },
  {
    question: "網站設計是一種常見的網絡安全漏洞。",
    answer: false,
    type: "true-false"
  },
  {
    question: "用戶體驗是一種常見的網絡安全措施。",
    answer: false,
    type: "true-false"
  },
  {
    question: "使用參數化查詢可以防止SQL注入攻擊。",
    answer: true,
    type: "true-false"
  },
  {
    question: "使用HTML編碼可以防止跨站腳本攻擊（XSS）。",
    answer: true,
    type: "true-false"
  },
  {
    question: "使用CSRF令牌可以防止跨站請求偽造（CSRF）。",
    answer: true,
    type: "true-false"
  },
  {
    question: "使用加密可以防止敏感數據暴露。",
    answer: true,
    type: "true-false"
  },
  {
    question: "使用安全配置指南可以防止安全錯誤配置。",
    answer: true,
    type: "true-false"
  },
  {
    question: "以下代碼片段中存在什麼漏洞？",
    codeSnippet: `
      const userInput = req.body.username;
      const query = \`SELECT * FROM users WHERE username = '\${userInput}'\`;
      db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    `,
    answer: "SQL注入漏洞",
    type: "codeSnippets"
  },
  {
    question: "以下代碼片段中存在什麼漏洞？",
    codeSnippet: `
      const userInput = req.body.username;
      res.send(\`<div>\${userInput}</div>\`);
    `,
    answer: "跨站腳本攻擊（XSS）漏洞",
    type: "codeSnippets"
  },
  {
    question: "以下代碼片段中存在什麼漏洞？",
    codeSnippet: `
      const userInput = req.body.username;
      const token = req.body.token;
      if (token === "validToken") {
        res.send(\`<div>\${userInput}</div>\`);
      }
    `,
    answer: "跨站請求偽造（CSRF）漏洞",
    type: "codeSnippets"
  },
  {
    question: "以下代碼片段中存在什麼漏洞？",
    codeSnippet: `
      const password = req.body.password;
      const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    `,
    answer: "使用不安全的哈希算法（MD5）",
    type: "codeSnippets"
  },
  {
    question: "以下代碼片段中存在什麼漏洞？",
    codeSnippet: `
      const config = {
        database: 'mydb',
        user: 'admin',
        password: 'password123'
      };
    `,
    answer: "硬編碼的敏感信息",
    type: "codeSnippets"
  }
]

export function getRandomQuestion() {
  return questionBank[Math.floor(Math.random() * questionBank.length)]
}

export default questionBank
