const accessUrl = atob('aHR0cHM6Ly9iaW9ncmFwaHlvZmFtZXJpY2EuZ2l0aHViLmlvL2xhdW5jaC13ci8');

document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector('.list');

    if (list) {
        const snes = document.querySelector('.snes');
        const n64 = document.querySelector('.n64');

        // Load data.json
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(entry => {
                    const [Placement, DisplayName, AccessValue, QuickLink] = entry;

                    if (QuickLink){
                        var linkPrefix;
                        if (QuickLink == 1){
                            // wr-res-a page
                            linkPrefix = atob('aHR0cHM6Ly9iaW9ncmFwaHlvZmFtZXJpY2EuZ2l0aHViLmlvL3dyLXJlc291cmNlcy1h');
                        }
                    }

                    // Create the .item div
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');
                    itemDiv.setAttribute('access', AccessValue);

                    const label = document.createElement('p');
                    label.classList.add('label');
                    label.textContent = DisplayName;

                    itemDiv.appendChild(label);

                    // Append to appropriate section
                    if (Placement === 'snes' && snes) {
                        snes.appendChild(itemDiv);
                    } else if (Placement === 'n64' && n64) {
                        n64.appendChild(itemDiv);
                    }
                });

                // Add click events after elements are added
                snes.querySelectorAll('.item').forEach(item => {
                    item.addEventListener('click', function () {
                        const access = this.getAttribute('access');
                        exec(access, 'snes');
                    });
                });

                n64.querySelectorAll('.item').forEach(item => {
                    item.addEventListener('click', function () {
                        const access = this.getAttribute('access');
                        exec(access, 'n64');
                    });
                });
            })
            .catch(error => {
                console.error('Error loading data.json:', error);
            });
    }

    function exec(access, placement){
        var link;
        if (placement == "snes"){
            if (linkPrefix){
                link = `${accessURL}?core=snes9x&rom=${linkPrefix}/${access}`;
            } else {
                link = `${accessURL}?core=snes9x&rom=${access}`;
            }

            launch(link);
        }
        if (placement == "n64"){
            if (linkPrefix){
                link = `${accessURL}?core=mupen64plus_next&rom=${linkPrefix}/${access}`;
            } else {
                link = `${accessURL}?core=mupen64plus_next&rom=${access}`;
            }

            launch(link);
        }
    }

    function launch(link){
        const win = window.open('about:blank', '_blank');

                if (win) {
                    win.document.body.style.margin = '0';
                    win.document.body.style.height = '100vh';

                    // Create an iframe and set the source
                    const iframe = win.document.createElement('iframe');
                    iframe.style.border = 'none';
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.margin = '0';
                    iframe.src = link;

                    // Append the iframe to the new window's body
                    win.document.body.appendChild(iframe);
                } else {
                    console.error('Popup blocked or failed to open.');
                    alert('Error: Unable to open new window.');
                }
    }
});
