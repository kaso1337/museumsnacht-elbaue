const layers = document.querySelectorAll('.layer');
        const overlay = document.querySelector('.overlay');
        const titleBlock = document.querySelector('.title-block');
        const infoBlock = document.querySelector('.info-block');
        const tourButton = document.getElementById('tour-button');
        const container = document.querySelector('#container');
        const background = document.querySelector('.background');

        let currentExpandedLayer = null;
        let currentTour = null;

        // Define tours for different layers
        const tours = {
            '1': [
                {
                    title: "Surrealistische Architektur",
                    description: "Die Proportionen und Wände der ursprünglich gotischen Hallenkirche wirken hier verzerrt und surreal. Wie wohl der Grundriss von dieser bizarren Kirche aussehen würde?",
                    zoomClass: "zoomed-first",
                    transform: "scale(1.5) translateX(+13%) translateY(-5%)"
                },
                {
                    title: "Rauchender Turm",
                    description: "Was mag wohl im Turm im Hintergrund passieren? Als wir das Bild generierten, wurde der KI gesagt, dass ein Stadtbrand dargestellt werden soll. - aber anscheindend hat sie noch nicht ganz verstanden wie Rauch entsteht",
                    zoomClass: "zoomed-second",
                    transform: "scale(1.8) translateX(-20%) translateY(+14%)"
                },
                {
                    title: "Mystische Kreatur",
                    description: "Was für ein seltsames  Tier hier neben den winzigen Pferden entstanden ist, wissen wir auch nicht... Vielleicht ist es eine ausgestorbene Art oder eine Phantasie-Kreatur die es nur im KI-Mittelalter gibt?",
                    zoomClass: "zoomed-third",
                    transform: "scale(1.8) translateX(+15%) translateY(-25%)"
                }
            ],
            '2': [
                {
                    title: "Rauchender Turm",
                    description: "Was mag wohl im Turm im Hintergrund passieren? Als wir das Bild generierten, wurde der KI gesagt, dass ein Stadtbrand dargestellt werden soll.",
                    zoomClass: "zoomed-first",
                    transform: "scale(1.5) translateX(-10%) translateY(-15%)"
                },
                {
                    title: "Seltsame Rauchwolken",
                    description: "Der Rauch scheint eigenartige Formen anzunehmen, fast als würde er lebendig werden.",
                    zoomClass: "zoomed-second",
                    transform: "scale(1.7) translateX(+15%) translateY(+5%)"
                }
            ],
            '5': [
                {
                    title: "Mystische Kreatur",
                    description: "Was für ein seltsames Tier hier neben den winzigen Pferden entstanden ist...",
                    zoomClass: "zoomed-first",
                    transform: "scale(2) translateX(0%) translateY(-10%)"
                },
                {
                    title: "Ungewöhnliche Proportionen",
                    description: "Vergleichen Sie die Größe der Tiere mit den umgebenden Elementen - hier stimmt etwas nicht.",
                    zoomClass: "zoomed-second",
                    transform: "scale(2.2) translateX(+5%) translateY(+5%)"
                }
            ]
        };

        // Initialize all elements as hidden
        titleBlock.style.display = "none";
        infoBlock.style.display = "none";
        document.getElementById('first-tour-info').style.display = "none";
        document.getElementById('second-tour-info').style.display = "none";
        document.getElementById('third-tour-info').style.display = "none";

        layers.forEach(layer => {
            layer.addEventListener('click', function(e) {
                if (e.target === this && !this.classList.contains('expanded')) {
                    if (currentExpandedLayer) {
                        closeExpanded();
                    }
                    
                    currentExpandedLayer = this;
                    const layerId = this.dataset.layer;
                    
                    background.classList.add('blurred');
                    layers.forEach(l => {
                        if (l !== this) l.classList.add('hidden');
                    });
    
                    const expandedContainer = document.createElement('div');
                    expandedContainer.className = 'expanded-container';
                    
                    const clonedLayer = this.cloneNode();
                    clonedLayer.classList.add('expanded');
                    
                    // Create and add close button
                    const closeButton = document.createElement('div');
                    closeButton.className = 'close-button';
                    closeButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        closeExpanded();
                    });
                    
                    expandedContainer.appendChild(clonedLayer);
                    expandedContainer.appendChild(closeButton); // Add close button to container
                    container.appendChild(expandedContainer);
                    
                    overlay.classList.add('active');
                    titleBlock.style.display = "block";
                    infoBlock.style.display = "block";
    
                    setTimeout(() => {
                        titleBlock.classList.add('visible');
                        infoBlock.classList.add('visible');
                        
                        // Enable tour button only if this layer has a tour
                        if (tours[layerId]) {
                            tourButton.style.display = "block";
                        } else {
                            tourButton.style.display = "none";
                        }
                    }, 10);
                }
            });
        });

        tourButton.addEventListener('click', () => {
            if (currentExpandedLayer) {
                const layerId = currentExpandedLayer.dataset.layer;
                currentTour = {
                    layerId: layerId,
                    currentStep: 0
                };
                startTourStep();
            }
        });

        function startTourStep() {
            const tour = tours[currentTour.layerId];
            const step = tour[currentTour.currentStep];
            const expandedImage = document.querySelector('.layer.expanded');
            
            if (expandedImage) {
                // Reset any previous zoom classes
                expandedImage.className = 'layer expanded';
                
                // Apply new zoom class and transformation
                expandedImage.classList.add(step.zoomClass);
                expandedImage.style.transform = step.transform;
                
                titleBlock.classList.remove('visible');
                infoBlock.classList.remove('visible');
                
                // Update tour info
                const tourInfo = document.getElementById('first-tour-info');
                tourInfo.querySelector('h3').textContent = step.title;
                tourInfo.querySelector('p').textContent = step.description;
                
                // Update buttons
                const nextButton = tourInfo.querySelector('button');
                nextButton.textContent = currentTour.currentStep === tour.length - 1 ? 
                    "Tour beenden" : "Weiter geht's!";
                nextButton.onclick = currentTour.currentStep === tour.length - 1 ? 
                    endTour : nextTourStep;
                
                // Show tour info
                setTimeout(() => {
                    tourInfo.style.display = "block";
                    setTimeout(() => {
                        tourInfo.classList.add('visible');
                    }, 10);
                }, 500);
            }
        }

        function nextTourStep() {
            currentTour.currentStep++;
            startTourStep();
        }

        function endTour() {
            const tourInfo = document.getElementById('first-tour-info');
            tourInfo.classList.remove('visible');
            setTimeout(() => {
                tourInfo.style.display = "none";
                const expandedImage = document.querySelector('.layer.expanded');
                if (expandedImage) {
                    expandedImage.className = 'layer expanded';
                    
                    setTimeout(() => {
                        titleBlock.classList.add('visible');
                        infoBlock.classList.add('visible');
                    }, 500);
                }
            }, 500);
        }

        function closeExpanded() {
            const expandedContainer = document.querySelector('.expanded-container');
            if (expandedContainer) {
                const expandedImage = document.querySelector('.layer.expanded');
                if (expandedImage) {
                    expandedImage.style.animation = 'shrinkOut 0.3s ease-in forwards';
                }
                
                titleBlock.classList.remove('visible');
                infoBlock.classList.remove('visible');
                document.querySelectorAll('.tour-info').forEach(info => {
                    info.classList.remove('visible');
                });
                
                background.classList.remove('blurred');
                layers.forEach(layer => {
                    layer.classList.remove('hidden');
                });
                
                overlay.classList.remove('active');
                
                setTimeout(() => {
                    expandedContainer.remove();
                    titleBlock.style.display = "none";
                    infoBlock.style.display = "none";
                    document.querySelectorAll('.tour-info').forEach(info => {
                        info.style.display = "none";
                    });
                    currentExpandedLayer = null;
                    currentTour = null;
                }, 300);
            }
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeExpanded();
            }
        });