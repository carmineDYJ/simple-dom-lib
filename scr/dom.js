window.dom = {
    create(string){
        // template?
        const container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2){
        // node2插在node的下一个兄弟之前
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2){
        // node2插在node之前
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, child){
        parent.appendChild(child);
    },
    wrap(node, parent){
        // parent先放node前面，再把node放parent里面
        dom.before(node, parent);
        dom.append(parent, node);
    },
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node){
        //node.innerHTML = '';
        const childNodes = node.childNodes;
        const childLength = childNodes.length
        const array = [];
        for (let i = 0; i < childLength; i++){
            array.push(dom.remove(childNodes[0]));
        }
        return array;
    },
    attr(node, name, value){
        if(arguments.length === 3){
            node.setAttribute(name, value);
        } else if (arguments.length === 2){
            return node.getAttribute(name);
        }
    },
    text(node, string){
        if(arguments.length === 2){
            if('innerText' in node){
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        } else if(arguments.length === 1) {
            return ('innerText' in node) ? node.innerText : node.textContent;
        }

    },
    html(node, string){
        if(arguments.length === 2){
            node.innerHTML = string;
        } else if(arguments.length === 1){
            return node.innerHTML;
        }
        
    },
    style(node, name, value){
        if (arguments.length === 3){
            node.style[name] = value;
        } else if(arguments.length === 2){
            if (typeof name === 'string'){
                return node.style[name];
            } else if (name instanceof Object){
                const obj = name;
                for(let key in obj){
                    node.style[key] = obj[key];
                }
            }    
        }
    },
    class: {
        add(node, className){
            node.classList.add(className);
        },
        remove(node, className){
            node.classList.remove(className);
        },
        has(node, className){
            return node.classList.contains(className);
        },
    },
    on(node, eventName, fn){
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn);
    },
    find(selector, scope){
        return (scope || document).querySelectorAll(selector);
    },
    parent(node){
        return node.parentNode;
    },
    children(node){
        return node.children;
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter((n) => n !== node);
    },
    next(node){
        let nextSibling = node.nextSibling;
        while(nextSibling.nodeType === 3){
            nextSibling = nextSibling.nextSibling;
        }
        return nextSibling;
    },
    previous(node){
        let previousSibling = node.previousSibling;
        while(previousSibling.nodeType === 3){
            previousSibling = previousSibling.previousSibling;
        }
        return previousSibling;
    },
    each(nodeList, fn){
        for(let i = 0; i < nodeList.length; i++){
            fn.call(null, nodeList[i]);
        }
    },
    index(node){
        const nodeList = dom.children(node.parentNode);
        let i;
        for (i = 0; i < nodeList.length; i++){
            if (nodeList[i] === node){
                break;
            }
        }
        return i + 1;
    },
};