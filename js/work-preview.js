(function () {
    /**
     * Directional vertical slideshow for the work preview panel.
     * Moving down the list: current exits up, new enters from below.
     * Moving up the list: current exits down, new enters from above.
     *
     * List order: coop(0) → volvo(1) → telia(2) → biljetter(3)
     */
    function initWorkPreview() {
        var wp        = CONFIG.WORK_PREVIEW;
        var preview   = document.querySelector(wp.SELECTORS.PREVIEW);
        var listItems = document.querySelectorAll(wp.SELECTORS.LIST_ITEM);

        if (!preview || !listItems.length) return;

        var previewLink    = preview.querySelector(wp.SELECTORS.PREVIEW_LINK);
        var previewImgs    = Array.from(preview.querySelectorAll(wp.SELECTORS.PREVIEW_IMGS));
        var titleEl        = preview.querySelector(wp.SELECTORS.TITLE);
        var subtitleEl     = preview.querySelector(wp.SELECTORS.SUBTITLE);
        var currentProject = wp.DEFAULT;

        function switchPreview(projectId) {
            var project = wp.PROJECTS[projectId];
            if (!project || projectId === currentProject) return;

            var order     = Object.keys(wp.PROJECTS);
            var goingDown = order.indexOf(projectId) > order.indexOf(currentProject);
            var enterFrom = goingDown ? 'translateY(100%)'  : 'translateY(-100%)';
            var exitTo    = goingDown ? 'translateY(-100%)' : 'translateY(100%)';

            var prevImg = previewImgs.find(function (img) {
                return img.classList.contains(wp.CLASSES.ACTIVE_IMG);
            });
            var nextImg = previewImgs.find(function (img) {
                return img.dataset.project === projectId;
            });

            if (!nextImg) return;

            // Exit current image in the correct direction
            if (prevImg) {
                prevImg.classList.remove(wp.CLASSES.ACTIVE_IMG);
                prevImg.style.transform = exitTo;
                prevImg.addEventListener('transitionend', function () {
                    prevImg.style.removeProperty('transform');
                }, { once: true });
            }

            // Snap entering image to its starting position (no transition)
            nextImg.style.transition = 'none';
            nextImg.style.transform  = enterFrom;
            void nextImg.getBoundingClientRect(); // force reflow — locks in the position

            // Next frame: remove overrides and add .is-active → CSS transition fires
            requestAnimationFrame(function () {
                nextImg.style.removeProperty('transition');
                nextImg.style.removeProperty('transform');
                nextImg.classList.add(wp.CLASSES.ACTIVE_IMG);
            });

            // Swap badge colour, link, titles
            Object.values(wp.PROJECTS).forEach(function (p) {
                preview.classList.remove(p.cssClass);
            });
            preview.classList.add(project.cssClass);
            previewLink.href         = project.href || '#';
            titleEl.textContent      = project.title;
            subtitleEl.textContent   = project.subtitle || '';
            subtitleEl.style.display = project.subtitle ? '' : 'none';

            currentProject = projectId;
        }

        listItems.forEach(function (item) {
            item.addEventListener('mouseenter', function () {
                switchPreview(item.dataset.project);
            });
        });

        var workBlock = document.querySelector(wp.SELECTORS.WORK_BLOCK);
        if (workBlock) {
            workBlock.addEventListener('mouseleave', function () {
                switchPreview(wp.DEFAULT);
            });
        }
    }

    document.addEventListener(CONFIG.EVENTS.DOM_CONTENT_LOADED, initWorkPreview);
}());
