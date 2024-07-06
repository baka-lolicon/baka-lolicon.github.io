let sidebar = document.createElement('div');
sidebar.className = 'sidebar';
sidebar.id = 'sidebar';

let button = document.createElement('button');
button.id = 'sidebtn';
button.className = 'toggle-btn';
button.textContent = '☰';
button.onclick = toggleSidebar;

sidebar.appendChild(button);

document.body.appendChild(sidebar);

let style = document.createElement('style');
style.textContent = `
  .sidebar {
      width: 300px;
      height: 100%;
      background-color: #333;
      color: #fff;
      position: fixed;
      left: -300px;
      top: 0;
      overflow-x: hidden;
      padding-top: 20px;
      transition: left 0.5s ease;
  }

  .toggle-btn {
      left: 300px;
      position: fixed;
      color: #333;
      top: 10px;
      font-size: 20px;
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: #000;
      z-index: 1;
  }

  .sidebar li {
      margin-bottom: 10px;
  }

  .sidebar li a {
      text-decoration: none;
      color: #333;
      display: block;
      padding: 5px 10px;
      transition: background-color 0.3s ease;
  }

  .sidebar li a:hover {
      background-color: #ddd;
  }

  .sidebar ul {
      padding-left: 20px;
      list-style-type: none;
  }

  .sidebar ul li {
      margin-bottom: 5px;
  }

  .sidebar ul li a {
      padding: 3px 8px;
      color: #999;
  }

  .sidebar ul li a:hover {
      background-color: #f0f0f0;
  }

`;


document.head.appendChild(style);

window.addEventListener('load', function () {
  function processString(input) {
    let processedString = input.toLowerCase();
    processedString = processedString.replace(/[^a-z\u4e00-\u9fa5]/g, '');
    return processedString;
}

// 示例用法
let inputString = "Hello, 你好！This is a Test.";
let processedResult = processString(inputString);
console.log(processedResult); // 输出：hello你好thisisatest


  let headings = document.querySelectorAll('h1, h2, h3, h4');

  headings = Array.from(headings).sort((a, b) => {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  function generateNestedList(headings, currentLevel) {
    let ul = document.createElement('ul');

    headings.forEach((heading) => {
      let level = parseInt(heading.tagName.charAt(1)) - 1;

      if (level === currentLevel) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = "#" + processString(heading.textContent);
        a.textContent = heading.textContent;
        li.appendChild(a);
        ul.appendChild(li);
      }
      else if (level > currentLevel) {
        let lastLi = ul.lastElementChild;
        if (!lastLi || lastLi.tagName !== 'LI') {
          lastLi = document.createElement('li');
          ul.appendChild(lastLi);
        }

        let nestedUl = generateNestedList([heading], currentLevel + 1);
        lastLi.appendChild(nestedUl);
      }
    });

    return ul;
  }


  headings.forEach(heading => {
    console.log(heading.tagName + ': ' + heading.textContent);
  });
  let nestedList = generateNestedList(headings, 0);

  let sidebox = document.getElementById("sidebar");
  sidebox.appendChild(nestedList);

});


function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  if (sidebar.style.left != "0px") {
    sidebar.style.left = "0px";
  } else {
    sidebar.style.left = "-300px";
  }
}