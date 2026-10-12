interface FlatIllustrationProps {
  className?: string;
}

export default function FlatIllustration({
  className = "",
}: FlatIllustrationProps) {
  return (
    <div
      className={`group relative flex w-full items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full max-h-[140px] sm:max-h-[160px] lg:max-h-[400px] transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        aria-label="Flat vector illustration of a developer working at a laptop"
        role="img"
      >
        <defs>
          <clipPath id="arch-clip">
            <path d="M 160 332 L 160 172 Q 160 84 320 84 Q 480 84 480 172 L 480 306 Q 480 332 454 332 Z" />
          </clipPath>
        </defs>

        {/* Backdrop panel */}
        <path
          d="M 160 332 L 160 172 Q 160 84 320 84 Q 480 84 480 172 L 480 306 Q 480 332 454 332 Z"
          fill="#efe7da"
        />
        <path
          d="M 160 332 L 160 262 Q 250 238 340 264 Q 420 286 480 270 L 480 306 Q 480 332 454 332 Z"
          fill="#e6dccb"
        />

        {/* Warm halo behind the figure, contained by the panel */}
        <g clipPath="url(#arch-clip)">
          <circle cx="198" cy="182" r="98" fill="#e9b98a" opacity="0.5" />
        </g>

        {/* Screen glow cast toward the figure */}
        <path
          d="M 330 202 L 250 156 L 250 252 L 330 286 Z"
          fill="#f97316"
          opacity="0.06"
        />

        {/* Desk */}
        <rect x="28" y="296" width="464" height="26" rx="10" fill="#2a2f3f" />
        <rect x="28" y="314" width="464" height="22" rx="10" fill="#171b26" />

        {/* Plant */}
        <g>
          <ellipse cx="470" cy="258" rx="15" ry="22" fill="#3aa07f" />
          <ellipse cx="452" cy="266" rx="12" ry="17" fill="#2f8f70" />
          <ellipse cx="486" cy="264" rx="11" ry="16" fill="#4bb08c" />
          <path d="M 452 300 L 488 300 L 482 274 L 458 274 Z" fill="#c2603f" />
          <rect x="454" y="272" width="32" height="7" rx="3.5" fill="#d9734f" />
        </g>

        {/* Figure */}
        <g>
          {/* Hood collar behind shoulders */}
          <ellipse cx="198" cy="220" rx="38" ry="15" fill="#227a6d" />

          {/* Neck */}
          <rect x="184" y="196" width="24" height="28" rx="10" fill="#d9945f" />

          {/* Torso */}
          <path
            d="M 156 300 L 156 250 C 156 228 174 216 196 216 C 224 216 246 228 246 252 L 246 300 Z"
            fill="#2f9d8c"
          />
          <path
            d="M 156 300 L 156 250 C 156 232 167 221 183 218 L 183 300 Z"
            fill="#227a6d"
          />
          <ellipse cx="200" cy="218" rx="24" ry="8" fill="#227a6d" />

          {/* Head */}
          <circle cx="196" cy="166" r="35" fill="#f0b184" />
          <ellipse cx="183" cy="172" rx="6" ry="9" fill="#f0b184" />
          <ellipse cx="183" cy="172" rx="2.6" ry="4.6" fill="#d9945f" />
          <path d="M 227 168 L 245 176 L 227 182 Z" fill="#f0b184" />
          <path d="M 227 176 L 245 176 L 227 182 Z" fill="#d9945f" />

          {/* Hair */}
          <path
            d="M 228 156 C 235 122 213 112 195 112 C 171 112 157 132 157 158 L 157 184 C 157 196 170 200 178 191 L 179 165 C 182 145 192 139 200 139 C 214 139 225 147 227 161 Z"
            fill="#191a24"
          />
          <path
            d="M 206 116 C 217 119 224 129 226 141"
            stroke="#0e0f16"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Face */}
          <rect x="207" y="145" width="15" height="4" rx="2" fill="#191a24" />
          <circle cx="222" cy="162" r="3" fill="#191a24" />
          <circle
            cx="221"
            cy="162"
            r="12.5"
            fill="#f97316"
            fillOpacity="0.14"
            stroke="#f97316"
            strokeWidth="3.4"
          />
          <path
            d="M 209 159 L 184 163"
            stroke="#f97316"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M 222 185 Q 227 190 232 185"
            stroke="#191a24"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Arm resting on the keyboard */}
          <path
            d="M 246 230 L 286 256 L 326 282"
            stroke="#2f9d8c"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 248 237 L 284 262 L 322 286"
            stroke="#227a6d"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 316 275 L 327 283"
            stroke="#1f6b60"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <ellipse
            cx="338"
            cy="286"
            rx="13"
            ry="9.5"
            fill="#f0b184"
            transform="rotate(-12 338 286)"
          />
          <path
            d="M 330 296 Q 344 300 352 292"
            stroke="#d9945f"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Laptop */}
        <g>
          <rect x="320" y="192" width="118" height="100" rx="9" fill="#2b3040" />
          <rect x="330" y="202" width="98" height="80" rx="4" fill="#0e1119" />
          <circle cx="340" cy="213" r="2.2" fill="#4a5270" />
          <circle cx="350" cy="213" r="2.2" fill="#4a5270" />
          <circle cx="360" cy="213" r="2.2" fill="#4a5270" />
          <rect x="340" y="226" width="44" height="5" rx="2.5" fill="#f97316" />
          <rect x="340" y="238" width="68" height="5" rx="2.5" fill="#4a5270" />
          <rect x="340" y="250" width="52" height="5" rx="2.5" fill="#2f9d8c" />
          <rect x="340" y="262" width="60" height="5" rx="2.5" fill="#4a5270" />
          <rect x="340" y="274" width="34" height="5" rx="2.5" fill="#fbbf24" />
          <rect x="316" y="286" width="126" height="6" rx="3" fill="#20242f" />
          <rect x="312" y="290" width="134" height="16" rx="6" fill="#3a4157" />
          <rect x="312" y="302" width="134" height="8" rx="4" fill="#20242f" />
        </g>

        {/* Mug */}
        <g>
          <path
            d="M 112 280 q 14 2 12 12 q -2 10 -12 10"
            stroke="#f4efe6"
            strokeWidth="5"
            fill="none"
          />
          <rect x="82" y="270" width="30" height="30" rx="6" fill="#f4efe6" />
          <ellipse cx="97" cy="270" rx="15" ry="5" fill="#6f4a2f" />
          <path
            d="M 92 262 C 90 256 96 253 94 247"
            stroke="#cfc4b4"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M 102 264 C 100 259 105 256 103 251"
            stroke="#cfc4b4"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        </g>

        {/* Floating code card */}
        <g>
          <rect
            x="42"
            y="64"
            width="96"
            height="66"
            rx="12"
            fill="#1b202e"
            stroke="#2a3040"
            strokeWidth="1.2"
          />
          <circle cx="56" cy="78" r="2.4" fill="#f97316" />
          <circle cx="66" cy="78" r="2.4" fill="#fbbf24" />
          <circle cx="76" cy="78" r="2.4" fill="#2f9d8c" />
          <rect x="54" y="90" width="60" height="4.5" rx="2.25" fill="#4a5270" />
          <rect x="54" y="100" width="72" height="4.5" rx="2.25" fill="#333a4d" />
          <rect x="54" y="110" width="46" height="4.5" rx="2.25" fill="#333a4d" />
        </g>

        {/* Floating accents */}
        <path
          d="M 122 136 Q 124 150 138 152 Q 124 154 122 168 Q 120 154 106 152 Q 120 150 122 136 Z"
          fill="#fbbf24"
        />
        <circle cx="62" cy="162" r="3.2" fill="#f97316" />
        <circle cx="96" cy="192" r="2.4" fill="#4a5270" />
        <circle cx="138" cy="206" r="2" fill="#fbbf24" />
      </svg>
    </div>
  );
}
