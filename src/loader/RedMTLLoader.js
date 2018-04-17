"use strict";
var RedMTLLoader;
(function () {
    var parser;
    /**DOC:
        {
            constructorYn : true,
            title :`RedMTLLoader`,
            description : `
                초안 작업진행중
            `,
            return : 'void'
        }
    :DOC*/
    RedMTLLoader = function (redGL, path, fileName, callback) {
        if ((!(this instanceof RedMTLLoader))) return new RedMTLLoader(redGL, path, fileName, callback)
        console.log('~~~~~~~~~~~')
        var self = this;
        var request = new XMLHttpRequest();
        request.open("GET", path + fileName);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    var data;
                    data = parser(self, redGL, request.responseText)
                    this['complete'] = false
                    self['parseData'] = data
                    if (callback) {
                        callback(self['parseData'] )
                    }
                }
            }
        request.send();
        this['path'] = path
        this['fileName'] = fileName
        this['complete'] = false
        this['parseData'] = null
    }
    parser = function (target, redGL, data) {
        var info;
        var lines;
        var reg_newmtl, reg_Ns, reg_Ka, reg_Kd, reg_Ks, reg_Ni, reg_d, reg_illum, reg_map_Kd;
        var currentMaterialInfo;
        info = {};
        reg_newmtl = /^(newmtl)/;
        reg_Ns = /^(Ns)/;
        reg_Ka = /^(Ka)/;
        reg_Kd = /^(Kd)/;
        reg_Ks = /^(Ks)/;
        reg_Ni = /^(Ni)/;
        reg_d = /^(d)/;
        reg_illum = /^(illum)/;
        reg_map_Kd = /^(map_Kd)/;
        data = data.replace(/^\#[\s\S]+?\n/g, '');
        lines = data.split("\n");

        lines.forEach(function (line) {
            if (reg_newmtl.test(line)) {
                console.log(line)
                var tName;
                tName = line.replace('newmtl ', '').trim()
                currentMaterialInfo = {
                    name: tName
                }
                info[tName] = currentMaterialInfo
            }
            else if (reg_Ns.test(line)) currentMaterialInfo['Ns'] = line.replace('Ns ', '')
            else if (reg_Ka.test(line)) currentMaterialInfo['Ka'] = line.replace('Ka ', '')
            else if (reg_Ks.test(line)) currentMaterialInfo['Ks'] = line.replace('Ks ', '')
            else if (reg_Ni.test(line)) currentMaterialInfo['Ni'] = line.replace('Ni ', '')
            else if (reg_d.test(line)) currentMaterialInfo['d'] = line.replace('d ')
            else if (reg_illum.test(line)) currentMaterialInfo['illum'] = line.replace('illum ', '')
            else if (reg_map_Kd.test(line)) currentMaterialInfo['map_Kd'] = target['path'] + line.replace('map_Kd ', '')
        })

        console.log(target)
        for (var k in info) {
           
            info[k]['material'] = RedStandardMaterial(redGL, RedBitmapTexture(redGL, info[k]['map_Kd']))
        }

        return info


    }
    Object.freeze(RedMTLLoader)
})()