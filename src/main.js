console.log(dom.find('div', hahaha)[0]);
console.log(dom.children(hahaha));
console.log(dom.children(lalala));
console.log(dom.siblings(dom.find('#a')[0]));
console.log(dom.next(dom.find('#a')[0]));
console.log(dom.previous(dom.find('#b')[0]));
dom.each(dom.children(hahaha), (n)=>dom.style(n, 'color', 'pink'));
console.log(dom.index(dom.find('#c')[0]));