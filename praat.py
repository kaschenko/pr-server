import parselmouth 

from parselmouth.praat import call

voicePath = './sounds/test.wav'
sound = parselmouth.Sound(voicePath)
pointProcess = call(sound, "To PointProcess (periodic, cc)", 75, 300)
localJitter = call(pointProcess, "Get jitter (local)", 0, 0, 0.0001, 0.02, 1.3)
rapJitter = call(pointProcess, "Get jitter (rap)", 0, 0, 0.0001, 0.02, 1.3)
localShimmer =  call([sound, pointProcess], "Get shimmer (local)", 0, 0, 0.0001, 0.02, 1.3, 1.6)
pitch = call(sound, "To Pitch", 0.0, 75, 300)
meanF0 = call(pitch, "Get mean", 0, 0, 'Hertz') # get mean pitch
print(f'localShimmer is {localShimmer}')
print(f'localJitter is {localJitter}')
print(f'rapJitter is {rapJitter}')

print(f'F0 is {meanF0}')
