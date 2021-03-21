from secrets import token_bytes
from coincurve import PublicKey
from sha3 import keccak_256

def generate():
    gen = {}
    gen["private_key"]  = keccak_256(token_bytes(32)).digest()
    gen["public_key"]   = PublicKey.from_valid_secret(gen["private_key"]).format(compressed=False)[1:]
    gen["address"]      = keccak_256(gen["public_key"]).digest()[-20:]
    return gen

if __name__ == "__main__":
    gen = generate()
    print('Private Key:', gen["private_key"].hex())
    print('Public Key:', gen["public_key"].hex())
    print('ETH Address: 0x' + gen["address"].hex())