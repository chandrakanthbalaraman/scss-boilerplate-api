'use strict';
var mkdirp = require('mkdirp');
var fs = require('fs');
var sass = require('node-sass');
exports.convertSass = function(req, res) {
    if(req.body){
        // var dataTemp = '#{headings(2,5)} { color: #08c; }';
        // var output = sass.renderSync({
        //     data: dataTemp,
        //     indentedSyntax: true,
        //     outputStyle : 'compressed'
        //   });
        
        // console.log(output.css.toString());
        let resObj = {
            code:200,
            message:"Success"
        }
        
        for(let obj of req.body){
            let newPath = obj.path.replace("./assets/partials/module","scss");
            console.log("newPath",newPath);
            mkdirp(newPath, function (err) {
                if (err) console.error(err)
                else {
                        let pathName = newPath+"/"+obj.name+obj.ext;
                        console.log("pathName",pathName);
                        // if(fs.existsSync(pathName)){
                            console.log("not exist");
                            fs.writeFileSync(pathName,obj.code);
                        // }else{
                        //     console.log("not exist");
                        // }
                    
                } 
            });
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

