function Mul_Outer_WeilerAtherton(subject, clip) {
    var subjectRing = subject;
    var subjectList = new polygonPro();
    var clipList = new polygonPro();

    //存入多边形顶点序列
    for (var i = 0; i < subject.length; i++) {
        subjectList.add(new Point(subject[i][0], subject[i][1]));
    }
    //存入裁剪框顶点序列
    for (var i = 0; i < clip.length; i++) {
        clipList.add(new Point(clip[i][0], clip[i][1]));
    }


    var currentSubject = subjectList.first;
    var currentClip = clipList.first; 

    for (var i = 0; i < subject.length - 1; i++) {
        currentClip = clipList.first
        for (var k = 0; k < clip.length - 1; k++) {
            var nextSubject = currentSubject.next;
            var nextClip = currentClip.next;

            var intersection = lineIntersects(
                currentSubject.point.px,
                currentSubject.point.py,
                nextSubject.point.px,
                nextSubject.point.py,
                currentClip.point.px,
                currentClip.point.py,
                nextClip.point.px,
                nextClip.point.py
            );

            if (intersection) {
                var isEntering = !isInside([currentClip.point.px, currentClip.point.py], subjectRing);
                subjectList.insertBefore(new Point(intersection[0], intersection[1], isEntering), nextSubject);
                clipList.insertBefore(new Point(intersection[0], intersection[1], isEntering), nextClip);
            }
            if (currentClip.next) {
                currentClip = currentClip.next;
            }
        }
        if (currentSubject.next) {
            currentSubject = currentSubject.next;
        }
    }
    // walk the lists
}

function lineIntersects(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        if (result.px != null && result.py != null) {
            return result;
        } else {
            return false;
        }
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.px = line1StartX + (a * (line1EndX - line1StartX));
    result.py = line1StartY + (a * (line1EndY - line1StartY));

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    if (result.onLine1 && result.onLine2) {
        return [result.px, result.py];
    } else {
        return false;
    }
}

function isInside(point, polygon) {
    var x = point[0];
    var y = point[1];
    var vs = polygon;

    var isInside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
}

// 画线
function TheLine(spoint, epoint) {
    // console.log("line");
    var pax = spoint.px;
    var pay = spoint.py;
    var pbx = epoint.px;
    var pby = epoint.py;
    var dx = pbx - pax;
    var dy = pby - pay;
    var x = pax;
    var y = pay;
    var eps;
    if (Math.abs(dx) > Math.abs(dy)) {
        eps = Math.abs(dx);
    } else {
        eps = Math.abs(dy);
    }
    var xlincre = dx * 1.0 / eps;
    var ylincre = dy * 1.0 / eps;
    for (var i = 0; i <= eps; i++) {
        new Point(parseInt(x + 0.5), parseInt(y + 0.5)).draw(); //画点
        x += xlincre;
        y += ylincre;

    }
}

//多边形类型
function polygonPro() {
    this.length = 0;
    this.first = null;
    this.last = null;
}

function PolygonNode(point) {
    this.point = point;
    this.next = null;
    this.prev = null;
    this.ear = false;
}

polygonPro.prototype = {
    add: function (point) {
        var node = new PolygonNode(point);

        if (!this.length) {
            this.first = this.last = node;

        } else {
            this.last.next = node;
            node.prev = this.last;
            this.last = node;
        }

        this.length++;
    },

    remove: function (node) {
        if (!this.length) return;

        if (node === this.first) {
            this.first = this.first.next;

            if (!this.first) this.last = null;
            else this.first.prev = null;

        } else if (node === this.last) {
            this.last = this.last.prev;
            this.last.next = null;

        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }

        node.prev = null;
        node.next = null;

        this.length--;
    },

    insertBefore: function (point, node) {
        var newNode = new PolygonNode(point);
        newNode.prev = node.prev;
        newNode.next = node;

        if (!node.prev) this.first = newNode;
        else node.prev.next = newNode;

        node.prev = newNode;

        this.length++;
    }
};