/*
 * TextSelection -- Library on a pure JavaScript that allowed get or set range positions based on text offset.
 *
 * Support all web-browsers except old IE (early than 9).
 *
 * Version 1.0.0.
 *
 * Copyright (c) 2015 Dmitry Zavodnikov.
 *
 * Licensed under the MIT License.
 */
/**
 * Internal method.
 */
function isChild(root, node) {
    if (root == node) {
        return true;
    } else {
        var childNodes = root.childNodes;
        for (var i = 0; i < childNodes.length; ++i) {
            var childNode = childNodes[i];

            if (isChild(childNode, node)) {
                return true;
            }
        }

        return false;
    }
}

/**
 * Return list of ranges that placed in some node. If you are have no selection:
 * <pre><code>
 * [
 *     {
 *         startPosition: 25,
 *         endPosition:   25
 *     }
 * ]
 * </code></pre>
 *
 * And if you have some selections:
 * <pre><code>
 * [
 *     {
 *         startPosition: 25,
 *         endPosition:   30
 *     },
 *     {
 *         startPosition: 42,
 *         endPosition:   54
 *     }
 * ]
 * </code></pre>
 */
function getNodeRanges(node) {
    if (node == null) {
        throw 'Parameter "node" can not be null or undefined!';
    }
    if (!(node instanceof Node)) {
        throw 'Parameter "node" should implement Node interface!';
    }

    var ranges = [];

    var selection = window.getSelection();
    for (var i = 0; i < selection.rangeCount; ++i) {
        var originalRange = selection.getRangeAt(i);

        if (isChild(node, originalRange.commonAncestorContainer)) {
            // Start position.
            var startRange = document.createRange();
            startRange.selectNodeContents(node);
            startRange.setEnd(originalRange.startContainer, originalRange.startOffset);
            var startPosition = startRange.toString().length;

            // End position.
            var endPosition = startPosition;
            if (!originalRange.collapsed) {
                var endRange = document.createRange();
                endRange.selectNodeContents(node);
                endRange.setEnd(originalRange.endContainer, originalRange.endOffset);
                endPosition = endRange.toString().length;
            }

            // Create and save range.
            var range = {
                startPosition: startPosition,
                endPosition: endPosition
            };
            ranges.push(range);
        }
    }

    return ranges;
}

/**
 * Remove all ranges from all nodes.
 */
function removeAllRanges() {
    var selection = window.getSelection();
    if (selection.removeRange != null) {
        // Firefox and IE (>= 9).
        while (selection.rangeCount > 0) {
            var rangeToRemove = selection.getRangeAt(0);

            selection.removeRange(rangeToRemove);
        }
        // Broke selection.
        //selection.removeAllRanges();
    } else {
        // Chrome and Safari.
        selection.removeAllRanges();
    }
}

/**
 * Internal method.
 */
function truncatePosition(node, position) {
    if (node == null) {
        throw 'Parameter "node" can not be null or undefined!';
    }
    if (!(node instanceof Node)) {
        throw 'Parameter "node" should implement Node interface!';
    }
    if (position == null) {
        throw 'Parameter "position" can not be null or undefined!';
    }
    if (isNaN(position)) {
        throw 'Parameter "position" should implement Number interface!';
    }

    var maxPosition = node.textContent.length;
    if (position < 0) {
        // Use -1 to set caret to the end of node.
        position = maxPosition;
    }
    if (position > maxPosition) {
        position = maxPosition;
    }

    return position;
}

/**
 * Internal method.
 */
function findContainerAndOffset(node, position) {
    if (node.nodeType == 3) {   // Text Node.
        return {container: node, offset: position};
    } else {                    // Other Nodes.
        var childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; ++i) {
            var childNode = childNodes[i];

            var txtLen = childNode.textContent.length;
            if (position > txtLen) {
                position = position - txtLen;
            } else {
                return findContainerAndOffset(childNode, position);
            }
        }

        // Should not happens.
        throw 'Parameter "position" is too big!';
    }
}

/**
 * Add caret or selection in some node.
 *
 * <p>
 * <strong>Note, that it operation not touch any over ranges!</strong>
 * </p>
 *
 * <p>
 * Put caret (for caret "startPosition" should be equals to "endPosition") in some node:
 * <pre><code>
 * [
 *     {
 *         startPosition: 25,
 *         endPosition:   25
 *     }
 * ]
 * </code></pre>
 * </p>
 *
 * <p>
 * Add selections in some node:
 * <pre><code>
 * [
 *     {
 *         startPosition: 25,
 *         endPosition:   30
 *     },
 *     {
 *         startPosition: 42,
 *         endPosition:   54
 *     }
 * ]
 * </code></pre>
 * </p>
 */
function addNodeRanges(node, ranges) {
    if (node == null) {
        throw 'Parameter "node" can not be null or undefined!';
    }
    if (!(node instanceof Node)) {
        throw 'Parameter "node" should implement Node interface!';
    }
    if (ranges == null) {
        throw 'Parameter "ranges" can not be null or undefined!';
    }
    if (!(ranges instanceof Array)) {
        throw 'Parameter "ranges" should implement Array interface!';
    }

    var selection = window.getSelection();
    for (var i = 0; i < ranges.length; ++i) {
        var range = ranges[i];

        // Create a new range.
        var newRange = document.createRange();

        // Find range start container and position.
        var start = findContainerAndOffset(node, range.startPosition);
        newRange.setStart(start.container, truncatePosition(start.container, start.offset));

        // Find range end container and position.
        var end = start;
        if (range.startPosition != range.endPosition) {
            end = findContainerAndOffset(node, range.endPosition);
        }
        newRange.setEnd(end.container, truncatePosition(end.container, end.offset));

        // Add original range.
        selection.addRange(newRange);
    }
}

/**
 * Put caret or selection in some node.
 *
 * <p>
 * <strong>Note, that it operation remove all over ranges!</strong>
 * </p>
 *
 * <p>
 * Put caret (for caret "startPosition" should be equals to "endPosition") in some node:
 * <pre><code>
 * [
 *     {
 *         startPosition: 25,
 *         endPosition:   25
 *     }
 * ]
 * </code></pre>
 * </p>
 *
 * <p>
 * Add selections in some node:
 * <pre><code>
 * [
 *     {
 *         startPosition: 25,
 *         endPosition:   30
 *     },
 *     {
 *         startPosition: 42,
 *         endPosition:   54
 *     }
 * ]
 * </code></pre>
 * </p>
 */
function setNodeRanges(node, ranges) {
    // Override all selections.
    removeAllRanges();
    addNodeRanges(node, ranges);
}

/**
 * Return caret position in some node. If node habe no any caret <code>-1</code> will be returned.
 */
function getNodeCaretPosition(node) {
    var ranges = getNodeRanges(node);
    var lastIndex = ranges.length - 1;
    if (lastIndex >= 0) {
        return ranges[lastIndex].endPosition;
    } else {
        return -1;
    }
}

/**
 * Set caret position in some node.
 *
 * <p>
 * <strong>Note, that it operation remove all over ranges!</strong>
 * </p>
 */
function setNodeCaretPosition(node, position) {
    position = truncatePosition(node, position);
    var positionRange = {
        startPosition: position,
        endPosition: position
    };
    setNodeRanges(node, [positionRange]);
}

var RedTextSpan;
(function () {
    RedTextSpan = function (text) {
        this._dom = document.createElement('span')
        this._dom.style.cssText = 'position:fixed;top:0;left:0;color:#fff;'
        this._dom.innerHTML = text
        document.body.appendChild(this._dom)
        this.text = text
    };
    RedTextSpan.prototype = {
        setColor: function (color, start, end) {
            var sel = window.getSelection();
            setNodeRanges(this._dom,
                [
                    {
                        startPosition: start,
                        endPosition: end
                    }
                ]
            )
            var range = sel.getRangeAt(0)
            console.log(sel)


            // var selection = document.getSelection();
            // var range = document.createRange();
            //
            // range.setStart(this._dom.childNodes, start)
            // range.setEnd(this._dom.childNodes, end)
            // console.log(range)
            // console.log(selection)
            // selection.addRange(range)
            var prevNode = range.extractContents()
            var t= document.createElement('span')
            t.style.cssText = 'color:'+color
            t.innerText = prevNode.textContent
            range.insertNode(t)
            sel.removeAllRanges()

        }
    }
    Object.freeze(RedTextSpan);
})()