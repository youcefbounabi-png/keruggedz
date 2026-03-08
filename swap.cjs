const fs = require('fs');

const path = 'c:/Users/Laylo/Downloads/keruggedz/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

const manifestoStart = content.indexOf('{/* Brand Manifesto Section */}');
const manifestoEnd = content.indexOf('</section>', manifestoStart) + 10;
const manifestoStr = content.substring(manifestoStart, manifestoEnd);

const gridStart = content.indexOf('{/* Featured Editorial Grid */}');
const gridEnd = content.indexOf('</section>', gridStart) + 10;
const gridStr = content.substring(gridStart, gridEnd);

const toReplace = content.substring(manifestoStart, gridEnd);

let CROGridStr = gridStr
    .replace(
        `t('View Equipment', 'شوف السلعة')`,
        `t('View Details / Add to Cart', 'التفاصيل / إضافة للسلة')`
    )
    .replace(
        "className={`px-10 py-5 bg-[#fafafa] text-[#111111] text-[10px]",
        "className={`px-10 py-5 bg-[#fafafa] text-[#111111] text-[10px] md:text-xs hover:bg-black hover:text-white border border-transparent hover:border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    )
    .replace(
        '<span className="text-xs font-mono tracking-widest text-[#fafafa]">{item.price}</span>',
        '<span className="text-xs md:text-sm font-bold font-mono tracking-widest text-[#ffffff] bg-black/50 px-3 py-1 border border-white/20">{item.price}</span>'
    );


const replacement = CROGridStr + '\n\n      ' + manifestoStr;

const newContent = content.replace(toReplace, replacement);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully swapped sections and updated CRO text.');
