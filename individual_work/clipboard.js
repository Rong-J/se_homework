// 已接受到文本内容，实现复制到剪贴板
if (!navigator.clipboard) {
    navigator.clipboard = {
        writeText: text => {

            // 创建一个名为span的html元素，存放接收到的text文本信息
            const span = document.createElement('span');
            span.textContent = text; // 返回文本内容
            span.style.whiteSpace = 'pre'; // 保留空格和换行符
            span.style.position = 'absolute';
            span.style.left = '-9999px';
            span.style.top = '-9999px';

            // 创建一个窗口用于显示接受到的文本信息
            const win = window;
            const selection = win.getSelection(); // 创建一个selection对象
            win.document.body.appendChild(span); // 向窗口中添加span为子类
            const range = win.document.createRange(); // 创建一个Range对象
            selection.removeAllRanges(); // 从当前selection对象中移除所有range对象
            range.selectNode(span); // 使range对象包含span
            selection.addRange(range); // 将range添加到selection的range对象中

            let success = false;
            try {
                success = win.document.execCommand('copy'); // 调用execCommand方法复制文本(选中的文本进入剪贴板)
            } catch (err) {
                return Promise.error();
            }

            // 初始化，便于下次显示
            selection.removeAllRanges();
            span.remove();

            return Promise.resolve();
        }
    }
}