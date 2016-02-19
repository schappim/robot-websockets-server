
var ws       = new WebSocket('ws://' + window.location.host + window.location.pathname);


        var lPWM = pad(0,3);
        var rPWM = pad(0,3);
        var lDirection = "F";
        var rDirection = "F";

        var cached = "";
        var joystickL = nipplejs.create({
            zone: document.getElementById('left'),
            mode: 'static',
            position: { left: '20%', top: '50%' },
            color: 'green',
            size: 200
        });
        console.log(joystickL);

        var joystickR = nipplejs.create({
            zone: document.getElementById('right'),
            mode: 'static',
            position: { left: '80%', top: '50%' },
            color: 'red',
            size: 200
        });




        function sendData(){



            var dataToSend = "L" + lDirection + lPWM + "-" + "R" + rDirection + rPWM;
            if(dataToSend != cached){
                ws.send(dataToSend);
                                cached = "L" + lDirection + lPWM + "-" + "R" + rDirection + rPWM;
                            }

            /*if(dataToSend != cached){
            $.ajax({
                url: "/joystick.lua",
                method:"GET",
                context: document.body,
                data: {data: "L" + lDirection + lPWM + "-" + "R" + rDirection + rPWM}
            }).done(function() {
                cached = "L" + lDirection + lPWM + "-" + "R" + rDirection + rPWM;
              console.log("done");
            });
            }
            else{
                
            }*/
        }



        function pad(num, size) {
            var s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        }

        function pwmValue(power){
            var pwm = 255 * (power/100)
            return pad(Math.round(pwm),3);
        }

        function direction(dir){
            var d = "";

            if(dir == 'up'){
                d = "F";
            }else{
                d = "B";
            }
            return d;
        }


        function sendMotor1(direction, pwm){


            $.ajax({
                url: "/motor1",
                method:"GET",
                context: document.body,
                data: {direction: direction, pwm: pwm}
            }).done(function() {
              console.log("done");
            });
        }

        function sendMotor2(direction, pwm){
            $.ajax({
                url: "/motor2",
                method:"GET",
                context: document.body,
                data: {direction: direction, pwm: pwm}
            }).done(function() {
              console.log("done");
            });
        }

        function bindLNipple () {
                joystickL.on('start end', function (evt, data) {

                }).on('move', function (evt, data) {

                 if(data.direction !== undefined){

                    lPWM = pwmValue(pad(data.distance, 3));
                    lDirection = direction(data.direction.y);
                    sendData();
                }else{

                    lPWM = pwmValue(0);
                    sendData();

                }

                }).on('dir:up plain:up dir:left plain:left dir:down ' +
                    'plain:down dir:right plain:right',
                    function (evt, data) {



                        //dump(evt.type);
                    }
                ).on('end', function (evt, data) {


                    lPWM = pwmValue(pad(0, 3));
                    sendData();

                    //console.log("DIRECTION:" + data.direction.y);
                    //console.log("DISTANCE: " + pad(0, 3));
                    //console.log("PWM: " + pad(0, 3));
                    //sendMotor1("", pad(0, 3));

                        //dump(evt.type);
                    }
                ).on('pressure', function (evt, data) {
                    //debug({pressure: data});
                });
            }

            function bindRNipple () {
                joystickR.on('start end', function (evt, data) {

                }).on('move', function (evt, data) {

                 if(data.direction !== undefined){
                    rPWM = pwmValue(pad(data.distance, 3));
                    rDirection = direction(data.direction.y);
                    sendData();

                }else{
                    rPWM = pwmValue(pad(0, 3));
                    sendData();


                }

                }).on('dir:up plain:up dir:left plain:left dir:down ' +
                    'plain:down dir:right plain:right',
                    function (evt, data) {

                        //dump(evt.type);
                    }
                ).on('end', function (evt, data) {

                    rPWM = pwmValue(pad(0, 3));
                    sendData();

                        //dump(evt.type);
                    }
                ).on('pressure', function (evt, data) {
                    //debug({pressure: data});
                });
            }
        console.log(joystickR);
        bindLNipple();
        bindRNipple();


