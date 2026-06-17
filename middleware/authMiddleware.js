const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).send(`
      <html>
        <body style="font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; background:#f0f2f5;">
          <div style="text-align:center; background:white; padding:2rem; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.1);">
            <h2 style="color:#dc2626">⛔ Unauthorized / 未授權</h2>
            <p style="color:#6b7280">You must be logged in to access this page.</p>
            <p style="color:#6b7280">請先登入才能訪問此頁面。</p>
            <p style="color:#9ca3af; font-size:14px">Redirecting to login in <span id="count">5</span> seconds...</p>
            <p style="color:#9ca3af; font-size:14px">將在 <span id="count2">5</span> 秒後跳轉到登入頁面...</p>
          </div>
          <script>
            let s = 5
            const c1 = document.getElementById('count')
            const c2 = document.getElementById('count2')
            setInterval(() => {
              s--
              c1.textContent = s
              c2.textContent = s
              if (s <= 0) window.location.href = '/login.html'
            }, 1000)
          </script>
        </body>
      </html>
    `)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).send(`
      <html>
        <body style="font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; background:#f0f2f5;">
          <div style="text-align:center; background:white; padding:2rem; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.1);">
            <h2 style="color:#dc2626">⛔ Unauthorized / 未授權</h2>
            <p style="color:#6b7280">You must be logged in to access this page.</p>
            <p style="color:#6b7280">請先登入才能訪問此頁面。</p>
            <p style="color:#9ca3af; font-size:14px">Redirecting to login in <span id="count">5</span> seconds...</p>
            <p style="color:#9ca3af; font-size:14px">將在 <span id="count2">5</span> 秒後跳轉到登入頁面...</p>
          </div>
          <script>
            let s = 5
            const c1 = document.getElementById('count')
            const c2 = document.getElementById('count2')
            setInterval(() => {
              s--
              c1.textContent = s
              c2.textContent = s
              if (s <= 0) window.location.href = '/login.html'
            }, 1000)
          </script>
        </body>
      </html>
    `)
  }
}