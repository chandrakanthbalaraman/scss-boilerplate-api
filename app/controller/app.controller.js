'use strict';
var mkdirp = require('mkdirp');
var fs = require('fs');
var sass = require('node-sass');
exports.uploadScss = function(req, res) {
    if(req.body){
        // var dataTemp = '#{headings(2,5)} { color: #08c; }';
        // var output = sass.renderSync({
        //     data: dataTemp,
        //     indentedSyntax: true,
        //     outputStyle : 'compressed'
        //   });
        
        // console.log(output.css.toString());
        
        let importText = "";
        for(let obj of req.body){
            let newPath = obj.path.replace("./assets/partials/module","scss");
            console.log("newPath",newPath);
            mkdirp(newPath, function (err) {
                if (err) console.error(err)
                else {
                        let pathName = newPath+"/"+obj.name+obj.ext;
                        console.log("pathName",pathName);
                        console.log("not exist");
                        fs.writeFileSync(pathName,obj.code);
                        
                    
                } 
            });
            let importPath = obj.path.replace("./assets/partials/module/","");
            console.log("importPath",importPath);
            let importFileName = importPath+"/"+obj.name+obj.ext;
            console.log("importFileName",importFileName);
            importText+="@import '"+importFileName+"';\n"
        }
        fs.writeFileSync("scss/kui.scss",importText);
        let resObj = {
            code:200,
            message:"Success"
        }
        res.status(200).send(resObj);
    }else{
        let resObj = {
            code:401,
            message:"Bad Request"
        }
        res.status(401).send(resObj);
    }
    
    
};

exports.convertScss = function(req,res){
        console.log("req",req.body);
        let color = req.body;
        let themeColor = `
                $theme-colors: (
                    "primary":    `+color.primary+`,
                    "secondary":    `+color.secondary+`,  
                    "success":      `+color.success+`,  
                    "info":         `+color.info+`,  
                    "warning":   `+color.warning+`,  
                    "danger":   `+color.danger+`,  
                    "light":    `+color.light+`,  
                    "dark":      `+color.dark+`  
                );
        `;
      
        let fileArr = [];        
        let parentModuleFile = 'scss/kui.scss';
        let parentModuleCode = fs.readFileSync(parentModuleFile, 'utf8');
        var lines = parentModuleCode.split('\n');
            for(var line = 0; line < lines.length; line++){
                var find = ["@import",",",";","'"];
                var replace = ['','','',''];
                
                let fileNames = replaceStr(lines[line], find, replace);
                if(fileNames!=null && fileNames!=undefined && fileNames!=""){
                    fileArr.push(fileNames);
                }
                
            }
        let scss = themeColor;
        
        for(let file of fileArr){
            scss+=fs.readFileSync("scss/"+file, 'utf8');
        }
        console.log("scss",scss);
        var output = sass.renderSync({
            data: scss
          });
        
        // console.log(output.css.toString());
        let resObj = {
            code:200,
            message:"Success",
            css:output.css.toString()
        }
        res.status(200).send(resObj);
        
}

// var walk = function(dir) {
//     var results = [];
//     var list = fs.readdirSync(dir);
//     list.forEach(function(file) {
//         file = dir + '/' + file;
//         var stat = fs.statSync(file);
//         if (stat && stat.isDirectory()) { 
//             /* Recurse into a subdirectory */
//             results = results.concat(walk(file));
//         } else { 
//             /* Is a file */
//             results.push(file);
//         }
//     });
//     return results;
// }

var replaceStr = function(str, find, replace) {
    for (var i = 0; i < find.length; i++) {
        str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
    }
    return str.trim();
}

