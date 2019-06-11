function setCookie(e, t, o) {
    var a = new Date;
    a.setTime(a.getTime() + 24 * o * 60 * 60 * 1e3);
    var i = "expires=" + a.toUTCString();
    document.cookie = e + "=" + t + ";" + i + ";path=/"
}

function getCookie(e) {
    var t = ("; " + document.cookie).split("; " + e + "=");
    if (2 == t.length) return t.pop().split(";").shift()
}! function(e) {
    var t = /iPhone/i,
        o = /iPod/i,
        a = /iPad/i,
        i = /\bAndroid(?:.+)Mobile\b/i,
        n = /Android/i,
        r = /\bAndroid(?:.+)SD4930UR\b/i,
        s = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
        l = /Windows Phone/i,
        d = /\bWindows(?:.+)ARM\b/i,
        p = /BlackBerry/i,
        c = /BB10/i,
        h = /Opera Mini/i,
        u = /\b(CriOS|Chrome)(?:.+)Mobile/i,
        m = /\Mobile(?:.+)Firefox\b/i;

    function g(e, t) {
        return e.test(t)
    }

    function w(e) {
        var w = e || ("undefined" != typeof navigator ? navigator.userAgent : ""),
            E = w.split("[FBAN");
        void 0 !== E[1] && (w = E[0]), void 0 !== (E = w.split("Twitter"))[1] && (w = E[0]);
        var T = {
            apple: {
                phone: g(t, w),
                ipod: g(o, w),
                tablet: !g(t, w) && g(a, w),
                device: g(t, w) || g(o, w) || g(a, w)
            },
            amazon: {
                phone: g(r, w),
                tablet: !g(r, w) && g(s, w),
                device: g(r, w) || g(s, w)
            },
            android: {
                phone: g(r, w) || g(i, w),
                tablet: !g(r, w) && !g(i, w) && (g(s, w) || g(n, w)),
                device: g(r, w) || g(s, w) || g(i, w) || g(n, w)
            },
            windows: {
                phone: g(l, w),
                tablet: g(d, w),
                device: g(l, w) || g(d, w)
            },
            other: {
                blackberry: g(p, w),
                blackberry10: g(c, w),
                opera: g(h, w),
                firefox: g(m, w),
                chrome: g(u, w),
                device: g(p, w) || g(c, w) || g(h, w) || g(m, w) || g(u, w)
            }
        };
        return T.any = T.apple.device || T.android.device || T.windows.device || T.other.device, T.phone = T.apple.phone || T.android.phone || T.windows.phone, T.tablet = T.apple.tablet || T.android.tablet || T.windows.tablet, T
    }
    "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = w : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = w() : "function" == typeof define && define.amd ? define([], e.isMobile = w()) : e.isMobile = w()
}(this), document.addEventListener("touchmove", function(e) {
    "false" == $(".game").attr("data-pause") && e.preventDefault()
}, {
    passive: !1
});
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(e) {
    e = escape(e);
    var t, o, a, i, n, r = "",
        s = "",
        l = "",
        d = 0;
    do {
        a = (t = e.charCodeAt(d++)) >> 2, i = (3 & t) << 4 | (o = e.charCodeAt(d++)) >> 4, n = (15 & o) << 2 | (s = e.charCodeAt(d++)) >> 6, l = 63 & s, isNaN(o) ? n = l = 64 : isNaN(s) && (l = 64), r = r + keyStr.charAt(a) + keyStr.charAt(i) + keyStr.charAt(n) + keyStr.charAt(l), t = o = s = "", a = i = n = l = ""
    } while (d < e.length);
    return r
}

function pad(e, t) {
    for (var o = e + ""; o.length < t;) o = "0" + o;
    return o
}
var loadingManager = new THREE.LoadingManager,
    OBJloader = new THREE.OBJLoader(loadingManager);
OBJloader.crossOrigin = "";
var TLoader = new THREE.TextureLoader(loadingManager);
TLoader.crossOrigin = "";
var CubeTLoader = new THREE.CubeTextureLoader(loadingManager);
CubeTLoader.crossOrigin = "", Ammo().then(function(e) {
    Detector.webgl || (Detector.addGetWebGLMessage(), document.getElementById("container").innerHTML = "");
    var t, o, a, n, r, s, l = !1,
        d = !1,
        p = !0,
        c = !1;
    isMobile.android.phone && (c = !0);
    var h, u, m, g, w, E, T, v, f = new THREE.Clock,
        y = !1,
        b = new THREE.Vector2,
        x = new THREE.Raycaster,
        R = new THREE.MeshPhongMaterial({
            color: 10042624
        }),
        L = new THREE.Vector3,
        S = new THREE.Quaternion,
        H = -9.8,
        M = [],
        C = [],
        B = .05,
        k = new e.btTransform,
        z = new e.btSoftBodyHelpers,
        P = {
            startX: 0,
            startY: 0,
            startTime: 0,
            startIndex: 0,
            endX: 0,
            endY: 0,
            endTime: 0,
            endIndex: 0,
            lastGoal: 0,
            lastPosY: 0,
            lastDirection: "",
            currentScore: 0,
            currentLevel: 0,
            isGoal: !1,
            gameOver: !1,
            lockControls: !0
        },
        I = {
            0: {
                x: 0,
                z: -.3,
                maxScores: 10,
                throwSpeed: 4.2,
                throwUp: 5,
                help: .95,
                tolerance: 0,
                fakeBallTrimX: 0,
                fakeBallTrimZ: .46
            },
            1: {
                x: 0,
                z: 1,
                maxScores: 20,
                throwSpeed: 5,
                throwUp: 6,
                help: .93,
                tolerance: 20,
                fakeBallTrimX: 0,
                fakeBallTrimZ: 1.8
            },
            2: {
                x: .7,
                z: 1.5,
                maxScores: 30,
                throwSpeed: 5.2,
                throwUp: 6,
                help: .93,
                tolerance: -20,
                fakeBallTrimX: -.19,
                fakeBallTrimZ: 2.37
            },
            3: {
                x: -.9,
                z: 1.4,
                maxScores: 40,
                throwSpeed: 5,
                throwUp: 6,
                help: .9,
                tolerance: 20,
                fakeBallTrimX: .25,
                fakeBallTrimZ: 2.37
            },
            4: {
                x: 3.9,
                z: -3.4,
                maxScores: 50,
                throwSpeed: 2.2,
                throwUp: 6,
                help: .87,
                tolerance: -20,
                fakeBallTrimX: .05,
                fakeBallTrimZ: 4.14
            },
            5: {
                x: 0,
                z: 5.4,
                maxScores: 99999,
                throwSpeed: 7.2,
                throwUp: 5,
                help: .75,
                tolerance: -20,
                fakeBallTrimX: 0,
                fakeBallTrimZ: 6.2
            }
        },
        A = {
            upperSin: .02,
            speedThrow: .04,
            torusTolerance: .33,
            torusPositionX: 0,
            torusPositionY: 4.02,
            torusPositionZ: -4.47,
            removeAfterScore: !0,
            removeDelay: 1e4,
            introTrainingAnimationDelay: 9e3,
            introTrainingCameraPositionX: 0,
            introTrainingCameraPositionY: 2.4,
            introTrainingCameraPositionZ: 20.7,
            introAnimationDelay: 2e3,
            introCameraPositionX: 0,
            introCameraPositionY: 2.4,
            introCameraPositionZ: 20.7,
            oscilationMaxX: 300,
            oscilationMaxY: 100,
            oscilationMaxZ: 100,
            playerHeight: 2.4,
            oscalationY: .2,
            oscalationYtime: 4e3,
            fakeBallRadius: .1,
            fakeBallHeight: 2.14,
            fakeBallRotationSpeed: .002
        };

    function O(t, o, a, i, r, s, l, d, p, c) {
        var h = new THREE.MeshPhongMaterial({
                color: 16776960,
                refractionRatio: 1,
                opacity: 0,
                shininess: 0,
                transparent: !0
            }),
            u = new THREE.BoxGeometry(a, i, r, 1, 1, 1),
            m = new e.btBoxShape(new e.btVector3(.5 * a, .5 * i, .5 * r));
        s || (s = 0), l || (l = 1);
        var g = new THREE.Mesh(u, h);
        g.position.copy(t), g.quaternion.copy(o), g.rotation.x = d * (Math.PI / 180), g.rotation.y = p * (Math.PI / 180), g.rotation.z = c * (Math.PI / 180), n.add(g);
        var E = new e.btTransform;
        E.setIdentity(), E.setOrigin(new e.btVector3(t.x, t.y, t.z)), E.setRotation(new e.btQuaternion(d * (Math.PI / 90) / Math.PI, p * (Math.PI / 90) / Math.PI, c * (Math.PI / 90) / Math.PI, o.w));
        var T = new e.btDefaultMotionState(E),
            v = new e.btVector3(0, 0, 0);
        m.calculateLocalInertia(s, v);
        var f = new e.btRigidBodyConstructionInfo(s, T, m, v),
            y = new e.btRigidBody(f);
        y.setFriction(l), y.setRestitution(4), g.castShadow = !1, g.receiveShadow = !1, w.addRigidBody(y)
    }

    function X(t, o, a, i, r) {
        t.position.copy(i), t.quaternion.copy(r);
        var s = new e.btTransform;
        s.setIdentity(), s.setOrigin(new e.btVector3(i.x, i.y, i.z)), s.setRotation(new e.btQuaternion(r.x, r.y, r.z, r.w));
        var l = new e.btDefaultMotionState(s),
            d = new e.btVector3(0, 0, 0);
        o.calculateLocalInertia(a, d);
        var p = new e.btRigidBodyConstructionInfo(a, l, o, d),
            c = new e.btRigidBody(p);
        return t.userData.physicsBody = c, n.add(t), a > 0 && (M.push(t), c.setActivationState(4)), w.addRigidBody(c), c
    }(function() {
        if (t = document.getElementById("container"), a = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, .2, 2e3), n = new THREE.Scene, "true" == getCookie("training_off")) {
            a.position.x = A.introCameraPositionX, a.position.y = A.introCameraPositionY, a.position.z = A.introCameraPositionZ;
            var e = A.introAnimationDelay
        } else {
            a.position.x = A.introTrainingCameraPositionX, a.position.y = A.introTrainingCameraPositionY, a.position.z = A.introTrainingCameraPositionZ;
            var e = A.introTrainingAnimationDelay
        }
        P.lockControls = !0, setTimeout(function() {
            new TWEEN.Tween({
                x: a.position.x,
                y: a.position.y,
                z: a.position.z
            }).to({
                x: I[0].x,
                y: A.playerHeight,
                z: I[0].z
            }, e).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                a.position.set(this.x, this.y, this.z)
            }).onComplete(function() {
                P.gameOver = !1, P.lockControls = !1, $(".game-instructions.training-mode").fadeIn();
                var e = n.getObjectByName("fakeBall", !0),
                    t = new THREE.Vector3(a.position.x + I[0].fakeBallTrimX, -1, -1.54 + I[0].fakeBallTrimZ);
                t.applyQuaternion(a.quaternion), e.position.copy(t), e.visible = !0, new TWEEN.Tween({
                    x: e.position.x,
                    y: e.position.y,
                    z: e.position.z
                }).to({
                    x: e.position.x,
                    y: A.fakeBallHeight,
                    z: e.position.z
                }, 500).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                    e.position.set(this.x, this.y, this.z)
                }).onComplete(function() {
                    P.lockControls = !0
                }).start()
            }).start()
        }, 0), (r = new THREE.WebGLRenderer).setClearColor(0), r.setPixelRatio(window.devicePixelRatio), r.setSize(window.innerWidth, window.innerHeight), r.shadowMap.enabled = !0, r.shadowMap.type = THREE.PCFShadowMap, s = new THREE.TextureLoader;
        var i = new THREE.AmbientLight(16777215, .01);
        n.add(i), c ? (spotLight = new THREE.SpotLight(16777215, 1), spotLight.position.set(0, 19, 4), spotLight.angle = Math.PI / 8, spotLight.penumbra = 1, spotLight.decay = 0, spotLight.distance = 100, spotLight.castShadow = !1, spotLight.shadow.mapSize.width = 524, spotLight.shadow.mapSize.height = 524, spotLight.shadow.camera.near = 10, spotLight.shadow.camera.far = 200, n.add(spotLight), n.add(spotLight.target), spotLight.target.position.z = spotLight.target.position.z - 1, spotLight3 = new THREE.SpotLight(16777215, 1), spotLight3.angle = .33, spotLight3.penumbra = 1, spotLight3.decay = 0, spotLight3.distance = 100, spotLight3.shadow.mapSize.width = 524, spotLight3.shadow.mapSize.height = 524, spotLight3.shadow.camera.near = 1, spotLight3.shadow.camera.far = 7, spotLight3.shadowDarkness = .1, spotLight3.castShadow = !1, spotLight3.position.set(1, 2, .7), n.add(spotLight3.target), n.add(spotLight3), spotLight3.target.position.x = A.torusPositionX, spotLight3.target.position.y = A.torusPositionY + .6, spotLight3.target.position.z = A.torusPositionZ) : (spotLight = new THREE.SpotLight(16777215, .8), spotLight.position.set(0, 19, 4), spotLight.angle = Math.PI / 8, spotLight.penumbra = 1, spotLight.decay = 0, spotLight.distance = 100, spotLight.castShadow = !1, spotLight.shadow.mapSize.width = 524, spotLight.shadow.mapSize.height = 524, spotLight.shadow.camera.near = 10, spotLight.shadow.camera.far = 200, n.add(spotLight), n.add(spotLight.target), spotLight.target.position.z = spotLight.target.position.z - 1, spotLight2 = new THREE.SpotLight(16777215, .7), spotLight2.angle = .18, spotLight2.penumbra = 1, spotLight2.decay = 0, spotLight2.distance = 100, spotLight2.shadow.mapSize.width = 524, spotLight2.shadow.mapSize.height = 524, spotLight2.shadow.camera.near = 1, spotLight2.shadow.camera.far = 7, spotLight2.shadowDarkness = .1, spotLight2.castShadow = !0, spotLight2.position.set(1, 19.4, 1.1), n.add(spotLight2.target), n.add(spotLight2), spotLight2.target.position.x = A.torusPositionX, spotLight2.target.position.y = A.torusPositionY + 1.8, spotLight2.target.position.z = A.torusPositionZ + 1.85, spotLight3 = new THREE.SpotLight(16777215, .4), spotLight3.angle = .33, spotLight3.penumbra = 1, spotLight3.decay = 0, spotLight3.distance = 100, spotLight3.shadow.mapSize.width = 524, spotLight3.shadow.mapSize.height = 524, spotLight3.shadow.camera.near = 1, spotLight3.shadow.camera.far = 7, spotLight3.shadowDarkness = .1, spotLight3.castShadow = !1, spotLight3.position.set(1, 2, .7), n.add(spotLight3.target), n.add(spotLight3), spotLight3.target.position.x = A.torusPositionX, spotLight3.target.position.y = A.torusPositionY + .6, spotLight3.target.position.z = A.torusPositionZ), t.innerHTML = "", t.appendChild(r.domElement), l && ((o = new Stats).domElement.style.position = "absolute", o.domElement.style.top = "0px", t.appendChild(o.domElement)), window.addEventListener("resize", _, !1)
    })(), h = new e.btSoftBodyRigidBodyCollisionConfiguration, u = new e.btCollisionDispatcher(h), m = new e.btDbvtBroadphase, g = new e.btSequentialImpulseConstraintSolver, softBodySolver = new e.btDefaultSoftBodySolver, (w = new e.btSoftRigidDynamicsWorld(u, m, g, h, softBodySolver)).setGravity(new e.btVector3(0, H, 0)), w.getWorldInfo().set_m_gravity(new e.btVector3(0, H, 0)),
        function(t, o, a, i, r, l, d) {
            var p = new THREE.MeshPhongMaterial({
                    color: 16776960
                }),
                c = new THREE.BoxGeometry(a, i, r, 1, 1, 1),
                h = new e.btBoxShape(new e.btVector3(.5 * a, .5 * i, .5 * r));
            l || (l = 0), d || (d = 1);
            var u = new THREE.Mesh(c, p);
            u.position.copy(t), u.quaternion.copy(o), n.add(u);
            var m = new e.btTransform;
            m.setIdentity(), m.setOrigin(new e.btVector3(t.x, t.y, t.z)), m.setRotation(new e.btQuaternion(o.x, o.y, o.z, o.w));
            var g = new e.btDefaultMotionState(m),
                E = new e.btVector3(0, 0, 0);
            h.calculateLocalInertia(l, E);
            var T = new e.btRigidBodyConstructionInfo(l, g, h, E),
                v = new e.btRigidBody(T);
            v.setFriction(d), v.setRestitution(7.5), s.load("/assets/img/game-textures/parquet.jpg", function(e) {
                e.wrapS = THREE.RepeatWrapping, e.wrapT = THREE.RepeatWrapping, e.repeat.set(14, 14), e.rotation = .9, u.material.map = e, u.material.needsUpdate = !0, u.material.color.setHex(16777215)
            }), u.castShadow = !1, u.receiveShadow = !0, w.addRigidBody(v), l > 0 && (v.setActivationState(DISABLE_DEACTIVATION), syncList.push(function(e) {
                var t = v.getMotionState();
                if (t) {
                    t.getWorldTransform(TRANSFORM_AUX);
                    var o = TRANSFORM_AUX.getOrigin(),
                        a = TRANSFORM_AUX.getRotation();
                    u.position.set(o.x(), o.y(), o.z()), u.quaternion.set(a.x(), a.y(), a.z(), a.w())
                }
            }));
            var f = new THREE.TextureLoader,
                p = new THREE.MeshPhongMaterial({
                    map: f.load("/assets/img/game-textures/field.png"),
                    shininess: 0,
                    transparent: !0,
                    side: THREE.DoubleSide
                }),
                h = new THREE.PlaneGeometry(35, 35),
                y = new THREE.Mesh(h, p);
            y.position.set(0, .51, 12), y.receiveShadow = !0, y.rotation.x = Math.PI / 2, y.rotation.z = Math.PI / 2, n.add(y)
        }(new THREE.Vector3(0, 0, 0), new THREE.Quaternion(0, 0, 0, 1), 75, 1, 75, 0, 2),
        function(e, t, o, a, i, r, s) {
            var l = new THREE.TextureLoader,
                d = new THREE.MeshBasicMaterial({
                    map: l.load("/assets/img/game-textures/background.jpg")
                }),
                p = new THREE.PlaneGeometry(350, 140);
            (c = new THREE.Mesh(p, d)).position.set(0, 50, -85), c.receiveShadow = !1, n.add(c);
            var c, l = new THREE.TextureLoader,
                d = new THREE.MeshBasicMaterial({
                    map: l.load("/assets/img/game-textures/light.jpg")
                }),
                p = new THREE.PlaneGeometry(50, 20);
            (c = new THREE.Mesh(p, d)).position.set(-20, 38, 85), c.receiveShadow = !1, c.rotation.y = Math.PI, c.material.side = THREE.DoubleSide, n.add(c)
        }(new THREE.Vector3(0, -20, -50), new THREE.Quaternion(0, 0, 0, 1)),
        function(t, o, r, l, d, h, u) {
            var m = new THREE.MeshPhongMaterial({
                    color: 16776960,
                    refractionRatio: 1,
                    opacity: 1,
                    shininess: 0,
                    transparent: !1
                }),
                g = new THREE.BoxGeometry(r, l, d, 1, 1, 1),
                E = new e.btBoxShape(new e.btVector3(.5 * r, .5 * l, .5 * d));
            h || (h = 0), u || (u = 1);
            var T = new THREE.Mesh(g, m);
            T.position.copy(t), T.quaternion.copy(o), n.add(T), T.name = "board";
            var v = new e.btTransform;
            v.setIdentity(), v.setOrigin(new e.btVector3(t.x, t.y, t.z)), v.setRotation(new e.btQuaternion(o.x, o.y, o.z, o.w));
            var f = new e.btDefaultMotionState(v),
                y = new e.btVector3(0, 0, 0);
            E.calculateLocalInertia(h, y);
            var b = new e.btRigidBodyConstructionInfo(h, f, E, y),
                x = new e.btRigidBody(b);
            if (x.setFriction(u), x.setRestitution(3), s.load("assets/img/game-textures/basket/kos/T_SAJBA.png", function(e) {
                    e.wrapS = THREE.RepeatWrapping, e.wrapT = THREE.RepeatWrapping, e.repeat.set(1, 1), T.material.map = e, T.material.needsUpdate = !0, T.material.color.setHex(16777215), T.material.alphaTest = 0, T.material.reflectivity = 0, T.material.transparent = !1
                }), T.receiveShadow = !0, c || (T.castShadow = !0), w.addRigidBody(x), h > 0 && (x.setActivationState(DISABLE_DEACTIVATION), syncList.push(function(e) {
                    var t = x.getMotionState();
                    if (t) {
                        t.getWorldTransform(TRANSFORM_AUX);
                        var o = TRANSFORM_AUX.getOrigin(),
                            a = TRANSFORM_AUX.getRotation();
                        T.position.set(o.x(), o.y(), o.z()), T.quaternion.set(a.x(), a.y(), a.z(), a.w())
                    }
                })), p) {
                var R = new THREE.CubeGeometry(r, l, d, 1, 1, 1);
                mirrorCubeCamera = new THREE.CubeCamera(10, 500, 128), mirrorCubeCamera.position.copy(t), mirrorCubeCamera.rotation.y = Math.PI, mirrorCubeCamera.lookAt(a.position.x, a.position.y, a.position.z), n.add(mirrorCubeCamera);
                var L = new THREE.MeshBasicMaterial({
                    envMap: mirrorCubeCamera.renderTarget,
                    opacity: .55,
                    transparent: !0
                });
                mirrorCube = new THREE.Mesh(R, L), mirrorCube.receiveShadow = !1, mirrorCube.castShadow = !1, mirrorCube.position.copy(t), mirrorCubeCamera.position = mirrorCube.position, n.add(mirrorCube)
            }
            o.setFromAxisAngle(new THREE.Vector3(0, 0, 0), 1);
            var S = function(t, o, a, i, n, r, s) {
                    var l = new THREE.Mesh(new THREE.BoxGeometry(t, o, a, 1, 1, 1), s),
                        d = new e.btBoxShape(new e.btVector3(.5 * t, .5 * o, .5 * a));
                    return d.setMargin(B), X(l, d, i, n, r), l
                }(0, 0, 0, 0, t, o, new THREE.MeshPhongMaterial({
                    opacity: 0,
                    transparent: !0
                })),
                H = (new THREE.BufferGeometry).fromGeometry(new THREE.CylinderGeometry(.52, .3, .75, 32, 1, !0));
            H.translate(0, 3.68, -4.37);
            var M = [];
            M.push(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60),
                function(t, o, a, r, s) {
                    var l, d, p;
                    l = t, (d = (new THREE.Geometry).fromBufferGeometry(l)).mergeVertices(), p = function(e) {
                            for (var t = e.vertices.length, o = e.faces.length, a = new THREE.BufferGeometry, i = new Float32Array(3 * t), n = new(3 * o > 65535 ? Uint32Array : Uint16Array)(3 * o), r = 0; r < t; r++) {
                                var s = e.vertices[r],
                                    l = 3 * r;
                                i[l] = s.x, i[l + 1] = s.y, i[l + 2] = s.z
                            }
                            for (var r = 0; r < o; r++) {
                                var d = e.faces[r],
                                    l = 3 * r;
                                n[l] = d.a, n[l + 1] = d.b, n[l + 2] = d.c
                            }
                            return a.setIndex(new THREE.BufferAttribute(n, 1)), a.addAttribute("position", new THREE.BufferAttribute(i, 3)), a
                        }(d),
                        function(e, t) {
                            var o, a, i, n, r, s, l = e.attributes.position.array,
                                d = t.attributes.position.array,
                                p = t.index.array,
                                c = d.length / 3,
                                h = l.length / 3;
                            e.ammoVertices = d, e.ammoIndices = p, e.ammoIndexAssociation = [];
                            for (var u = 0; u < c; u++) {
                                var m = [];
                                e.ammoIndexAssociation.push(m);
                                for (var g = 3 * u, w = 0; w < h; w++) {
                                    var E = 3 * w;
                                    o = d[g], a = d[g + 1], i = d[g + 2], n = l[E], r = l[E + 1], s = l[E + 2], Math.abs(n - o) < 1e-6 && Math.abs(r - a) < 1e-6 && Math.abs(s - i) < 1e-6 && m.push(E)
                                }
                            }
                        }(l, p);
                    var c = new THREE.MeshBasicMaterial({
                            map: (new THREE.TextureLoader).load("assets/img/game-textures/basket/kos/T_MREZA.png"),
                            opacity: .97,
                            transparent: !0
                        }),
                        h = new THREE.MeshBasicMaterial({
                            map: (new THREE.TextureLoader).load("assets/img/game-textures/basket/kos/T_MREZA.png"),
                            opacity: .25,
                            transparent: !0,
                            side: THREE.BackSide
                        });
                    h.map.repeat.set(1, .6), c.map.repeat.set(1, .6), h.map.wrapT = THREE.RepeatWrapping, c.map.wrapT = THREE.RepeatWrapping;
                    var u = new THREE.Mesh(t, c),
                        m = new THREE.Mesh(t, h);
                    u.receiveShadow = !0, m.receiveShadow = !0, u.add(m), n.add(u);
                    var g = z.CreateFromTriMesh(w.getWorldInfo(), t.ammoVertices, t.ammoIndices, t.ammoIndices.length / 3, !0),
                        E = g.get_m_cfg();
                    for (E.set_viterations(40), E.set_piterations(40), E.set_collisions(17), E.set_kDF(.1), E.set_kDP(.01), E.set_kPR(a), g.get_m_materials().at(0).set_m_kLST(.9), g.get_m_materials().at(0).set_m_kAST(.9), g.setTotalMass(o, !1), e.castObject(g, e.btCollisionObject).getCollisionShape().setMargin(B), w.addSoftBody(g, 1, -1), u.userData.physicsBody = g, g.setActivationState(4), i = 0; i < s.length; i++) g.appendAnchor(s[i], r, !0, .2);
                    C.push(u)
                }(H, .073, 0, S.userData.physicsBody, M)
        }(new THREE.Vector3(0, 4.8, -5.085), new THREE.Quaternion(0, 0, 0, 1), 3.15, 1.77, .06, 0, 2), E = 0, T = 4.06, v = -4.93, (new THREE.MTLLoader).setPath("assets/img/game-textures/basket/").load("Kos_brez_mreze.mtl", function(e) {
            e.preload(), (new THREE.OBJLoader).setMaterials(e).setPath("assets/img/game-textures/basket/").load("Kos_brez_mreze.obj", function(e) {
                n.add(e), e.position.set(E, T, v), e.receiveShadow = !0, e.scale.set(1.2, 1.2, 1.2)
            })
        }),
        function(e, t, o) {
            var a = new THREE.TorusGeometry(.57, .028, 5, 30),
                i = new THREE.MeshPhongMaterial({
                    color: 16735744,
                    transparent: !0,
                    opacity: 0
                }),
                r = new THREE.Mesh(a, i);
            r.rotation.x = Math.PI / 180 * 90, r.position.set(e, t, o), n.add(r), r.receiveShadow = !0, c || (r.castShadow = !0)
        }(A.torusPositionX, A.torusPositionY, A.torusPositionZ),
        function() {
            var e = A.fakeBallRadius,
                t = new THREE.Mesh(new THREE.SphereGeometry(e, 18, 16), R);
            t.castShadow = !0, t.receiveShadow = !0, s.load("/assets/img/game-textures/ball.jpg", function(e) {
                e.wrapS = THREE.RepeatWrapping, e.wrapT = THREE.RepeatWrapping, e.repeat.set(1, 1), t.material.map = e, t.material.needsUpdate = !0, t.material.color.setHex(16777215)
            });
            var o = THREE.ImageUtils.loadTexture("/assets/img/game-textures/ball_normal.jpg", void 0, function() {
                t.material.normalMap = o
            });
            t.position.set(I[P.currentLevel].x, A.fakeBallHeight, I[P.currentLevel].z - 1), t.name = "fakeBall", n.add(t), t.rotation.set(1, 1, 1), t.visible = !1
        }(), O(new THREE.Vector3(-.17, 4.02, -4.9), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, 110, 35), O(new THREE.Vector3(.2, 4.02, -4.89), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, -110, 35), O(new THREE.Vector3(-.18, 4.02, -3.84), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, -110, 35), O(new THREE.Vector3(.16, 4.02, -3.84), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, 110, 35), O(new THREE.Vector3(.45, 4.02, -4.04), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, -215, 35), O(new THREE.Vector3(.47, 4.02, -4.68), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, 215, 35), O(new THREE.Vector3(.56, 4.02, -4.35), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, 180, 35), O(new THREE.Vector3(-.45, 4.02, -4.04), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, 215, 35), O(new THREE.Vector3(-.46, 4.02, -4.68), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, -215, 35), O(new THREE.Vector3(-.56, 4.02, -4.35), new THREE.Quaternion(0, 0, 0, 1), .035, .02, .36, 0, 1, 0, -180, 35), ["mousedown", "touchstart"].forEach(function(e) {
            t.addEventListener(e, function(e) {
                y || 1 == P.gameOver || 0 != P.lockControls || (P.startTime = Date.now(), isMobile.android.phone ? (P.startX = parseInt(e.changedTouches[0].pageX), P.startY = parseInt(e.changedTouches[0].pageY)) : (P.startX = parseInt(e.pageX), P.startY = parseInt(e.pageY)), ++P.startIndex)
            }, !1)
        }), ["mouseup", "touchend"].forEach(function(e) {
            t.addEventListener(e, function(e) {
                y || 1 == P.gameOver || 0 != P.lockControls || (P.endTime = Date.now(), isMobile.android.phone ? (P.endX = parseInt(e.changedTouches[0].pageX), P.endY = parseInt(e.changedTouches[0].pageY), b.set(parseInt(e.changedTouches[0].pageX) / window.innerWidth * 2 - 1, -parseInt(e.changedTouches[0].pageY) / window.innerHeight * 2 + 1)) : (P.endX = parseInt(e.pageX), P.endY = parseInt(e.pageY), b.set(e.pageX / window.innerWidth * 2 - 1, -e.pageY / window.innerHeight * 2 + 1)), ++P.endIndex, P.startIndex == P.endIndex ? y = !0 : P.endIndex = P.startIndex)
            }, !1)
        }), isMobile.apple.device && $("#hud .score-level").addClass("ios"), window.onload = function() {
            D()
        }, loadingManager.onLoad = (() => {
            console.log("LOADED"), matZoga = new THREE.MeshPhysicalMaterial({
                map: tZogaDiff,
                normalMap: tZogaNorm,
                metalness: 0,
                roughness: .5,
                reflectivity: 1,
                envMap: tEnv2,
                envMapIntensity: 2
            }), mZoga.material = matZoga, mZoga.position.set(0, -1, 1), mZoga.scale.set(5, 5, 5), n.add(mZoga)
        });
    new THREE.OBJLoader;

    function _() {
        a.aspect = window.innerWidth / window.innerHeight, a.updateProjectionMatrix(), r.setSize(window.innerWidth, window.innerHeight)
    }

    function D() {
        TWEEN.update(), requestAnimationFrame(D),
            function() {
                if ("false" == $(".game").attr("data-pause")) {
                    var t = f.getDelta();
                    ! function(e) {
                        w.stepSimulation(e, 0);
                        for (var t = 0, o = C.length; t < o; t++) {
                            for (var i = C[t], r = i.geometry, s = i.userData.physicsBody, d = r.attributes.position.array, p = r.attributes.normal.array, c = r.ammoIndexAssociation, h = c.length, u = s.get_m_nodes(), m = 0; m < h; m++)
                                for (var g = u.at(m), E = g.get_m_x(), T = E.x(), v = E.y(), f = E.z(), y = g.get_m_n(), b = y.x(), x = y.y(), R = y.z(), L = c[m], S = 0, H = L.length; S < H; S++) {
                                    var B = L[S];
                                    d[B] = T, p[B] = b, d[++B] = v, p[B] = x, d[++B] = f, p[B] = R
                                }
                            r.attributes.position.needsUpdate = !0, r.attributes.normal.needsUpdate = !0
                        }
                        for (var t = 0, o = M.length; t < o; t++) {
                            var z = M[t],
                                O = z.userData.physicsBody,
                                X = O.getMotionState();
                            if (X) {
                                X.getWorldTransform(k);
                                var _ = k.getOrigin(),
                                    D = k.getRotation();
                                if (z.position.set(_.x(), _.y(), _.z()), z.quaternion.set(D.x(), D.y(), D.z(), D.w()), t == M.length - 1) {
                                    if (P.lastPosY > _.y()) var V = "down";
                                    else var V = "up";
                                    if (0 == P.isGoal && _.y() < 1.2 && 0 == P.gameOver && !l) {
                                        if (0 != $(".profile-box--small.logged").length)
                                            if (P.currentScore >= I[0].maxScores) {
                                                P.lastDirection = "", P.isGoal = !1, P.gameOver = !0, P.lockControls = !0, $('div[rel="modal-result-played"] .modal-result-score').text(P.currentScore), P.lockControls = !0;
                                                var N = $('div[rel="modal-result-played"] .modal-headline h2').attr("data-val").split("|");
                                                $('div[rel="modal-result-played"] .modal-headline h2').text(N[Math.floor(Math.random() * N.length)]);
                                                var Y = $('div[rel="modal-result-played"] .modal-result-image').attr("data-val").split("|");
                                                $('div[rel="modal-result-played"] .modal-result-image').attr("src", Y[Math.floor(Math.random() * Y.length)]);
                                                var G = $('div[rel="modal-result-played"] .slick-slide .slide');
                                                $('div[rel="modal-result-played"] .slick-slide .slide').removeClass("is-selected");
                                                var U = 0,
                                                    Z = 0;
                                                if (G.each(function() {
                                                        parseInt($(this).attr("data-points-needed")) <= parseInt(P.currentScore) ? (U += 1, $(this).addClass("is-selected")) : 0 == Z && (Z = parseInt($(this).attr("data-points-needed")))
                                                    }), 0 == U) var j = 0;
                                                else if (1 == U) var j = 1;
                                                else if (2 == U) var j = 2;
                                                else if (U > 2) var j = 3;
                                                var Q = Math.floor(1e3 + 9e3 * Math.random());
                                                $.ajax({
                                                    url: $("body").attr("data-api") + "game",
                                                    dataType: "json",
                                                    type: "POST",
                                                    data: {
                                                        points: P.currentScore,
                                                        gameData: encode64(Date.now() + "" + parseInt(Q - P.currentScore) + Q)
                                                    },
                                                    scriptCharset: "utf-8",
                                                    cache: !1,
                                                    success: function(e) {
                                                        if (console.log(e.message + "X"), "Success" == e.message) {
                                                            parseInt($(".profile-box-score.pb-score strong").eq(0).text()) < P.currentScore && $(".profile-box-score.pb-score strong").text(P.currentScore);
                                                            var t = $('div[rel="modal-result-played"] .modal-result-desktop .modal-text p').attr("data-val").split("|");
                                                            $('div[rel="modal-result-played"] .modal-result-desktop .modal-text p, div[rel="modal-result-played"] .modal-result-mobile .modal-text p').text(t[j].replace("_X_", U).replace("_Y_", Z).replace("_XXX_", e.items.rank)), $("body").addClass("is-open-modal"), $('div[rel="modal-result-played"]').addClass("is-open-modal"), $('div[rel="modal-result-played"] .btn').on("click", function() {
                                                                W(), $('div[rel="modal-result-played"]').removeClass("is-open-modal"), $("body").removeClass("is-open-modal")
                                                            })
                                                        }
                                                    }
                                                })
                                            } else {
                                                P.currentScore = 0, P.currentLevel = 0, $(".score-level").text("00"), P.lockControls = !1;
                                                var F = n.getObjectByName("fakeBall", !0);
                                                if (0 == F.visible) {
                                                    $(".score-level").removeClass("hidden"), setTimeout(function() {
                                                        $(".score-level").addClass("hidden")
                                                    }, 1e3);
                                                    var q = new THREE.Vector3(a.position.x + I[P.currentLevel].fakeBallTrimX, -1, -1.54 + I[P.currentLevel].fakeBallTrimZ);
                                                    q.applyQuaternion(a.quaternion), F.position.copy(q), F.visible = !0;
                                                    new TWEEN.Tween({
                                                        x: F.position.x,
                                                        y: F.position.y,
                                                        z: F.position.z
                                                    }).to({
                                                        x: F.position.x,
                                                        y: A.fakeBallHeight,
                                                        z: F.position.z
                                                    }, 500).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                                                        F.position.set(this.x, this.y, this.z)
                                                    }).onComplete(function() {
                                                        console.log("done")
                                                    }).start()
                                                }
                                            }
                                        else if (P.currentScore >= 5) {
                                            P.lastDirection = "", P.isGoal = !1, P.gameOver = !0, P.lockControls = !0;
                                            var N = $('div[rel="modal-result"] .modal-headline h2').attr("data-val").split("|");
                                            $('div[rel="modal-result"] .modal-headline h2').text(N[Math.floor(Math.random() * N.length)]);
                                            var Y = $('div[rel="modal-result"] .modal-result-image').attr("data-val").split("|");
                                            $('div[rel="modal-result"] .modal-result-image').attr("src", Y[Math.floor(Math.random() * Y.length)]), $("body").addClass("is-open-modal"), $('div[rel="modal-result"]').addClass("is-open-modal"), $('div[rel="modal-result"]').attr("data-score", P.currentScore), $('div[rel="modal-result"] .modal-result-score').text(P.currentScore)
                                        } else {
                                            P.currentScore = 0, P.currentLevel = 0, $(".score-level").text("00"), P.lockControls = !1;
                                            var F = n.getObjectByName("fakeBall", !0);
                                            if (0 == F.visible) {
                                                $(".score-level").removeClass("hidden"), setTimeout(function() {
                                                    $(".score-level").addClass("hidden")
                                                }, 1e3);
                                                var q = new THREE.Vector3(a.position.x + I[P.currentLevel].fakeBallTrimX, -1, -1.54 + I[P.currentLevel].fakeBallTrimZ);
                                                q.applyQuaternion(a.quaternion), F.position.copy(q), F.visible = !0;
                                                new TWEEN.Tween({
                                                    x: F.position.x,
                                                    y: F.position.y,
                                                    z: F.position.z
                                                }).to({
                                                    x: F.position.x,
                                                    y: A.fakeBallHeight,
                                                    z: F.position.z
                                                }, 500).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                                                    F.position.set(this.x, this.y, this.z)
                                                }).onComplete(function() {
                                                    console.log("done"), P.lockControls = !1
                                                }).start()
                                            }
                                        }
                                        setCookie("training_off", "true", 100), A.removeAfterScore && setTimeout(function() {
                                            n.remove(z)
                                        }, A.removeDelay)
                                    }
                                    if ("down" == V && _.x() >= A.torusPositionX - A.torusTolerance && _.x() <= A.torusPositionX + A.torusTolerance && _.y() <= A.torusPositionY + .3 * A.torusTolerance && _.y() >= A.torusPositionY - A.torusTolerance / 1.5 && _.z() >= A.torusPositionZ - A.torusTolerance && _.z() <= A.torusPositionZ + A.torusTolerance && P.startTime != P.lastGoal) {
                                        if (console.log("goal!"), gtag("event", "Goal!", {
                                                event_category: "Game",
                                                event_label: "Play LaÄ¹Ë‡ko"
                                            }), P.isGoal = !0, P.lastGoal = P.startTime, P.currentScore = P.currentScore + 1, P.currentScore + 1 > I[P.currentLevel].maxScores) {
                                            P.currentLevel = P.currentLevel + 1, console.log("New level:" + P.currentLevel);
                                            var J = I[P.currentLevel].x,
                                                K = I[P.currentLevel].z;
                                            new TWEEN.Tween({
                                                x: a.position.x,
                                                y: a.position.y,
                                                z: a.position.z
                                            }).to({
                                                x: J,
                                                z: K
                                            }, 400).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                                                a.position.set(this.x, this.y, this.z), P.lockControls = !0, $(".game-instructions").fadeOut()
                                            }).onComplete(function() {
                                                var e = n.getObjectByName("fakeBall", !0),
                                                    t = new THREE.Vector3(a.position.x + I[P.currentLevel].fakeBallTrimX, -1, -1.54 + I[P.currentLevel].fakeBallTrimZ);
                                                t.applyQuaternion(a.quaternion), e.position.copy(t), e.visible = !0;
                                                new TWEEN.Tween({
                                                    x: e.position.x,
                                                    y: e.position.y,
                                                    z: e.position.z
                                                }).to({
                                                    x: e.position.x,
                                                    y: A.fakeBallHeight,
                                                    z: e.position.z
                                                }, 500).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                                                    e.position.set(this.x, this.y, this.z)
                                                }).onComplete(function() {
                                                    console.log("done"), P.lockControls = !1
                                                }).start()
                                            }).start()
                                        } else {
                                            var J = I[P.currentLevel].x + Math.floor(Math.random() * I[P.currentLevel].tolerance - 1) / 100,
                                                K = I[P.currentLevel].z + Math.floor(Math.random() * I[P.currentLevel].tolerance - 1) / 100;
                                            new TWEEN.Tween({
                                                x: a.position.x,
                                                y: a.position.y,
                                                z: a.position.z
                                            }).to({
                                                x: J,
                                                y: A.playerHeight,
                                                z: K
                                            }, 400).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                                                a.position.set(this.x, this.y, this.z), P.lockControls = !0
                                            }).onComplete(function() {
                                                var e = n.getObjectByName("fakeBall", !0),
                                                    t = new THREE.Vector3(a.position.x + I[P.currentLevel].fakeBallTrimX, -1, -1.54 + I[P.currentLevel].fakeBallTrimZ);
                                                t.applyQuaternion(a.quaternion), e.position.copy(t), e.visible = !0;
                                                new TWEEN.Tween({
                                                    x: e.position.x,
                                                    y: e.position.y,
                                                    z: e.position.z
                                                }).to({
                                                    x: e.position.x,
                                                    y: A.fakeBallHeight,
                                                    z: e.position.z
                                                }, 500).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                                                    e.position.set(this.x, this.y, this.z)
                                                }).onComplete(function() {
                                                    console.log("done"), P.lockControls = !1
                                                }).start()
                                            }).start()
                                        }
                                        $("#hud .score-level").text(pad(P.currentScore, 2)), $(".score-level").removeClass("hidden"), setTimeout(function() {
                                            $(".score-level").addClass("hidden")
                                        }, 1e3), A.removeAfterScore && setTimeout(function() {
                                            n.remove(z)
                                        }, A.removeDelay)
                                    }
                                    P.lastPosY = _.y(), P.lastDirection = V
                                }
                            }
                        }
                    }(t), a.lookAt(new THREE.Vector3(0, 3, -4)), p && (mirrorCube.visible = !0, mirrorCubeCamera.updateCubeMap(r, n)), o = "fakeBall", (o = n.getObjectByName(o, !0)).rotation.x -= 2 * A.fakeBallRotationSpeed, o.rotation.y -= A.fakeBallRotationSpeed, o.rotation.z -= 3 * A.fakeBallRotationSpeed, l && $("#hud .debug-position").text("X: " + Math.round(100 * a.position.x) / 100 + "; Z:" + Math.round(100 * a.position.z) / 100), d && (a.position.x = 0, a.position.y = 7.12, a.position.z = -4.37), r.render(n, a),
                        function() {
                            if (y && 1 != P.gameOver && 0 == P.lockControls && Math.abs(P.endY - P.startY) > 10) {
                                x.setFromCamera(b, a);
                                var t = new THREE.Mesh(new THREE.SphereGeometry(.29, 18, 18), R);
                                t.castShadow = !0, t.receiveShadow = !0, s.load("/assets/img/game-textures/ball.jpg", function(e) {
                                    e.wrapS = THREE.RepeatWrapping, e.wrapT = THREE.RepeatWrapping, e.repeat.set(1, 1), t.material.map = e, t.material.needsUpdate = !0, t.material.color.setHex(16777215)
                                });
                                var o = THREE.ImageUtils.loadTexture("/assets/img/game-textures/ball_normal.jpg", void 0, function() {
                                        t.material.normalMap = o, t.material.needsUpdate = !0
                                    }),
                                    i = new e.btSphereShape(.29);
                                i.setMargin(B), L.copy(x.ray.direction), L.add(x.ray.origin), S.set(10, 10, 0, 12);
                                var r = X(t, i, .2, L, S),
                                    l = Math.abs(P.endY - P.startY) * A.upperSin,
                                    d = (P.endTime - P.startTime) / 2 * A.speedThrow,
                                    p = I[P.currentLevel].throwSpeed,
                                    c = I[P.currentLevel].throwUp,
                                    h = I[P.currentLevel].help;
                                return 0 != h ? (p = d + (p - d * h / 1.4), c = l + (c - l * h)) : (p = d, c = l), n.getObjectByName("fakeBall", !0).visible = !1, L.copy(x.ray.direction), L.multiplyScalar(p), r.setLinearVelocity(new e.btVector3(L.x, L.y + c, L.z)), r.setAngularVelocity(new e.btVector3((P.endX - P.startX) / 100, p / 100, 1)), r.setRestitution(.1), r.setDamping(0, 0), $(".game-instructions").fadeOut(), P.lockControls = !0, P.isGoal = !1, y = !1, gtag("event", "Ball throw", {
                                    event_category: "Game",
                                    event_label: "Play LaÄ¹Ë‡ko"
                                }), t.position
                            }
                            Math.abs(P.endY - P.startY) <= 10 && (P.lockControls = !1, P.isGoal = !1, y = !1)
                        }()
                } else "restart" == $(".game").attr("data-pause") && (W(), $(".game").attr("data-pause", "false"));
                var o
            }(), l && o.update()
    }

    function W() {
        for (var e = 0, t = M.length; e < t; e++) {
            var o = M[e];
            n.remove(o)
        }
        M = [], P = {
            startX: 0,
            startY: 0,
            startTime: 0,
            startIndex: 0,
            endX: 0,
            endY: 0,
            endTime: 0,
            endIndex: 0,
            lastGoal: 0,
            lastPosY: 0,
            lastDirection: "",
            currentScore: 0,
            currentLevel: 0,
            isGoal: !1,
            gameOver: !1,
            lockControls: !0
        }, $(".score-level").text("00"), n.getObjectByName("fakeBall", !0).visible = !1;
        new TWEEN.Tween({
            x: a.position.x,
            y: a.position.y,
            z: a.position.z
        }).to({
            x: I[0].x,
            y: A.playerHeight,
            z: I[0].z
        }, 300).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
            a.position.set(this.x, this.y, this.z)
        }).onComplete(function() {
            P.gameOver = !1, $(".game-instructions").fadeIn();
            var e = n.getObjectByName("fakeBall", !0),
                t = new THREE.Vector3(a.position.x + I[P.currentLevel].fakeBallTrimX, -1, -1.54 + I[P.currentLevel].fakeBallTrimZ);
            t.applyQuaternion(a.quaternion), e.position.copy(t), e.visible = !0;
            new TWEEN.Tween({
                x: e.position.x,
                y: e.position.y,
                z: e.position.z
            }).to({
                x: e.position.x,
                y: A.fakeBallHeight,
                z: e.position.z
            }, 500).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                e.position.set(this.x, this.y, this.z), P.lockControls = !1
            }).onComplete(function() {
                console.log("done")
            }).start()
        }).start()
    }
    onRender = function() {
        ball.position.x += dxPerFrame, ball.position.x > 70 && (dxPerFrame = -.5), ball.position.x < -70 && (dxPerFrame = .5)
    }, $(".header-main-content .btn").on("click", function(e) {
        "igraj-zdaj" == location.hash.split("/")[1] && (e.preventDefault(), W())
    })
});