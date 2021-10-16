import {isScript,isPackageJson}from './files.js';


const TOKEN='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';

function authFetch(url){
    return fetch(url,{headers: {
        'Authorization': 'token '+TOKEN
      } })
}

function defaultBranch(owner,repo){
   return authFetch(`https://api.github.com/repos/${owner}/${repo}`)
    .then(res=>res.json())
    .then(o=>o.default_branch);
}

function filesOnBranch(owner,repo,branch){
    return authFetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`)
    .then(res=>res.json())
    .then(o=>{
        if (o.truncated) throw "Truncated list";
        return o.tree;
    });
}

function onlyJsFiles(objs){
    return objs.filter(o=>o.type==='blob'&&(isScript(o.path)||isPackageJson(o.path)));
}

export default function files(owner,repo){
   return defaultBranch(owner,repo)
    .then(branch=>filesOnBranch(owner,repo,branch))
    .then(os=>onlyJsFiles(os));
}