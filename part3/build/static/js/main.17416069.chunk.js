(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),o=t.n(c),u=t(14),a=t.n(u),r=t(3),s=t(0),i=function(e){var n=e.text,t=e.value,c=e.handleChange;return Object(s.jsxs)("div",{children:[n," ",Object(s.jsx)("input",{value:t,onChange:c})]})},l=function(e){var n=e.dataPerson,t=e.handleRemove;return Object(s.jsx)("div",{children:n.map((function(e){return Object(s.jsxs)("li",{children:[e.name," ",e.number,Object(s.jsx)("button",{onClick:function(n){t(n,e)},children:"delete"})]},e.name)}))})},d=function(e){var n=e.handleSubmit,t=e.inputNameValue,c=e.inputNameChange,o=e.inputNumberValue,u=e.inputNumberChange,a=e.handleSubmitButton;return Object(s.jsx)("div",{children:Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:t,onChange:c}),Object(s.jsx)("br",{}),"number: ",Object(s.jsx)("input",{value:o,type:"tel",onChange:u})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",onClick:a,children:"add"})})]})})},b=t(4),j=t.n(b),f="/api/persons",h=function(){return j.a.get(f).then((function(e){return e.data}))},m=function(e){return j.a.post(f,e).then((function(e){return e.data}))},p=function(e){return j.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},O=function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.types;return null===n?null:Object(s.jsx)("div",{className:t,children:n})},g=function(){var e=Object(c.useState)([]),n=Object(r.a)(e,2),t=n[0],o=n[1],u=Object(c.useState)(""),a=Object(r.a)(u,2),b=a[0],j=a[1],f=Object(c.useState)(""),g=Object(r.a)(f,2),x=g[0],w=g[1],C=Object(c.useState)(""),S=Object(r.a)(C,2),N=S[0],k=S[1],y=Object(c.useState)([]),T=Object(r.a)(y,2),L=T[0],V=T[1],B=Object(c.useState)(""),D=Object(r.a)(B,2),P=D[0],E=D[1],I=Object(c.useState)(""),J=Object(r.a)(I,2),R=J[0],A=J[1];Object(c.useEffect)((function(){console.log("in effect"),h().then((function(e){console.log("personService OK"),o(e),V(e)}))}),[]);var K=function(e){e.preventDefault();var n={name:b,number:x};if(t.some((function(e){return e.name.toLowerCase()===b.toLowerCase()}))){if(window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))){var c=t.findIndex((function(e){return e.name.toLowerCase()===b.toLowerCase()})),u=t[c];O(u.id,n).then((function(e){console.log("update success!");var n=t.filter((function(e){return e.id!==u.id}));n.push(e),o(n),V(n),j(""),w(""),k(""),E("'".concat(u.name,"' s number have been updated")),A("success"),setTimeout((function(){E(null)}),5e3)})).catch((function(e){console.log("fail"),console.log(e.response.data.error),E(e.response.data.error),A("error"),setTimeout((function(){E(null)}),5e3)}))}}else m(n).then((function(e){console.log("create success!");var n=t.concat(e);o(n),V(n),j(""),w(""),k(""),E("'".concat(e.name,"' is successfully added.")),A("success"),setTimeout((function(){E(null)}),5e3)})).catch((function(e){console.log("fail"),console.log(e.response.data.error),E(e.response.data.error),A("error"),setTimeout((function(){E(null),A("")}),5e3)}))};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(v,{message:P,types:R}),Object(s.jsx)(i,{text:"filter shown with:",value:N,handleChange:function(e){k(e.target.value),V(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),Object(s.jsx)("h3",{children:"Add new person"}),Object(s.jsx)(d,{handleSubmit:K,inputNameValue:b,inputNameChange:function(e){j(e.target.value)},inputNumberValue:x,inputNumberChange:function(e){w(e.target.value)},handleSubmitButton:K}),Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)(l,{dataPerson:L,handleRemove:function(e,n){e.preventDefault(),window.confirm("Delete ".concat(n.name,"?"))&&p(n.id).then((function(){console.log("delete success!");var e=t.filter((function(e){return n.id!==e.id}));o(e),V(e),E("".concat(n.name," is successfully deleted.")),A("success"),setTimeout((function(){E(null),A("")}),5e3)})).catch((function(e){console.log("fail"),E("There's an error"),A("error"),setTimeout((function(){E(null),A("")}),5e3)}))}})]})};t(38);a.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(g,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.17416069.chunk.js.map