class Elem{
    constructor(tag, attributes, children){
        this.tag = tag;
        this.attributes = attributes;
        this.children = children;
    };

    make(){
        let e = document.createElement(this.tag);

        Object.keys(this.attributes).forEach(key => {
            e.setAttribute(key, this.attributes[key]);
        });

        if (this.children != null){
            Array.from(this.children).forEach(child => {
                e.appendChild(child);
            });
        }

    };
};
