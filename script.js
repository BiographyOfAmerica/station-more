const accessUrl = atob('aHR0cHM6Ly9iaW9ncmFwaHlvZmFtZXJpY2EuZ2l0aHViLmlvL2xhdW5jaC13ci8');

document.addEventListener("DOMContentLoaded", function () {

    const list = document.querySelector('.list');

    if (list) {
        const snes = document.querySelector('.snes');
        const n64 = document.querySelector('.n64');
        const nds = document.querySelector('.nds');

        // Load data.json
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(entry => {
                    const [Placement, DisplayName, AccessValue, QuickLink] = entry;

                    let itemPrefix = '';

                    if (QuickLink) {
                        if (QuickLink == 1) {
                            itemPrefix = atob('aHR0cHM6Ly9iaW9ncmFwaHlvZmFtZXJpY2EuZ2l0aHViLmlvL3dyLXJlc291cmNlcy1h');
                        } else if (QuickLink == 3) {
                            itemPrefix = atob('aHR0cHM6Ly9ub21vY2VucmVzb3VyY2VzYS5naXRsYWIuaW8vZHM=');
                        }
                    }

                    // Create the .item div
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');
                    itemDiv.setAttribute('access', AccessValue);
                    if (itemPrefix) {
                        itemDiv.setAttribute('data-prefix', itemPrefix);
                    }

                    const label = document.createElement('p');
                    label.classList.add('label');
                    label.textContent = DisplayName;

                    itemDiv.appendChild(label);

                    // Append to appropriate section
                    if (Placement === 'snes' && snes) {
                        snes.appendChild(itemDiv);
                    } else if (Placement === 'n64' && n64) {
                        n64.appendChild(itemDiv);
                    } else if (Placement === 'nds' && nds) {
                        nds.appendChild(itemDiv);
                    }
                });

                // Add click events after elements are added
                snes.querySelectorAll('.item').forEach(item => {
                    item.addEventListener('click', function () {
                        const access = this.getAttribute('access');
                        const prefix = this.getAttribute('data-prefix');
                        exec(access, 'snes', prefix);
                    });
                });

                n64.querySelectorAll('.item').forEach(item => {
                    item.addEventListener('click', function () {
                        const access = this.getAttribute('access');
                        const prefix = this.getAttribute('data-prefix');
                        exec(access, 'n64', prefix);
                    });
                });

                nds.querySelectorAll('.item').forEach(item => {
                    item.addEventListener('click', function () {
                        const access = this.getAttribute('access');
                        const prefix = this.getAttribute('data-prefix');
                        exec(access, 'nds', prefix);
                    });
                });
            })
            .catch(error => {
                console.error('Error loading data.json:', error);
            });
    }

    function exec(access, placement, itemPrefix) {
        let link;
        const prefix = itemPrefix || '';
        if (placement === "snes") {
            link = `${accessUrl}?core=snes9x&rom=${prefix ? `${prefix}/${access}` : access}`;
            prompt('x', link);
        } else if (placement === "n64") {
            link = `${accessUrl}?core=mupen64plus_next&rom=${prefix ? `${prefix}/${access}` : access}`;
            prompt('x', link);
        } else if (placement === "nds") {
            link = `${accessUrl}?core=melonds&rom=${prefix ? `${prefix}/${access}` : access}`;
            prompt('x', link);

        }

        launch(link);
    }

    function launch(link) {
        const win = window.open('about:blank', '_blank');

        if (win) {
            win.document.body.style.margin = '0';
            win.document.body.style.height = '100vh';

            const iframe = win.document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';
            iframe.src = link;

            win.document.body.appendChild(iframe);
        } else {
            console.error('Popup blocked or failed to open.');
            alert('Error: Unable to open new window.');
        }
    }
});
