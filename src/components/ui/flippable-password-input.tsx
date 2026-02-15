
'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface FlippablePasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FlippablePasswordInput = forwardRef<HTMLInputElement, FlippablePasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [inputType, setInputType] = useState('password');

    const handleToggle = () => {
      setIsFlipped(!isFlipped);
      if (inputType === 'password') {
        setTimeout(() => {
          setInputType('text');
        }, 250);
      } else {
        setTimeout(() => {
          setInputType('password');
        }, 250);
      }
    };

    return (
      <div className={cn('flippable-password-card', isFlipped && 'flip')}>
        <div>
          <div className="clayout">
            <div className="c-front">
              <div className="input-wrapper">
                <input
                  type={inputType}
                  ref={ref}
                  className={cn('w-full', className)}
                  {...props}
                />
              </div>
            </div>
            <div className="c-back"></div>
          </div>
          <div className="toggle-show">
            <button
              type="button"
              className={cn('toggle-show-btn', isFlipped && 'changeit')}
              onClick={handleToggle}
            >
              <span className="sr-only">Toggle password visibility</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

FlippablePasswordInput.displayName = 'FlippablePasswordInput';

export { FlippablePasswordInput };
