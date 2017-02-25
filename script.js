function lookup(query) {
    var lookupView = document.getElementById('diki-lookup');

    if (!lookupView) {
        lookupView = document.createElement('object');

        lookupView.id = "diki-lookup";
        lookupView.type = "text/html";

        document.body.appendChild(lookupView);
    }

    lookupView.style.display = 'block';

    query = query.trim();
    lookupView.data = "https://www.diki.pl/slownik-angielskiego?q=" + query;
};

function main() {
    var delta = 500;
    var lastKeyPressTime = 0;

    document.addEventListener('keydown', function handleKeydown(e) {
        var target = e.target;
        if (target.tagName === 'INPUT' && target.type === 'text') { return; }

        if (e.keyCode != 68) { return; }

        var currentKeyPressTime = new Date();
        if (currentKeyPressTime - lastKeyPressTime <= delta) {
            var selected = document.getSelection().toString();

            lookup(selected);
        }
        
        lastKeyPressTime = currentKeyPressTime;
    }, false);
    
    document.addEventListener('dblclick', function handleDblclick(e) {
        var target = e.target;
        if (target.tagName === 'INPUT' && target.type === 'text') { return; }

        var selected = document.getSelection().toString().trim();
        if (selected === '') { return; }

        lookup(selected);
    }, false);

    document.addEventListener('click', function handleClick(e) {
        var target = e.target;


        var lookupView = document.getElementById('diki-lookup');
        if (target == lookupView) return;
        if (target.parent == lookupView) return;

        lookupView.style.display = 'none';
    }, false);
};

main();
